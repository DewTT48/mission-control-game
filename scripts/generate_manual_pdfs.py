#!/usr/bin/env python3
"""Generate polished Thai PDF manuals from the Markdown source guides."""

from __future__ import annotations

import html
import re
from dataclasses import dataclass
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    LongTable,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    XPreformatted,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
FONT_DIR = Path("/Users/dewteerapap/Library/Fonts")

FONT_REGULAR = FONT_DIR / "IBMPlexSansThai-Regular.ttf"
FONT_MEDIUM = FONT_DIR / "IBMPlexSansThai-Medium.ttf"
FONT_SEMIBOLD = FONT_DIR / "IBMPlexSansThai-SemiBold.ttf"
FONT_BOLD = FONT_DIR / "IBMPlexSansThai-Bold.ttf"

NAVY = colors.HexColor("#071A2F")
PANEL = colors.HexColor("#102B46")
PANEL_LIGHT = colors.HexColor("#EAF2F8")
YELLOW = colors.HexColor("#FFD447")
CYAN = colors.HexColor("#3AAAF5")
GREEN = colors.HexColor("#3DDB9A")
ORANGE = colors.HexColor("#FF813A")
INK = colors.HexColor("#142638")
MUTED = colors.HexColor("#506477")
LINE = colors.HexColor("#BCD0DF")
WHITE = colors.white


@dataclass(frozen=True)
class ManualSpec:
    source: Path
    output: Path
    title: str
    subtitle: str
    cover_note: str
    short_title: str
    confidentiality: str
    accent: colors.Color


MANUALS = (
    ManualSpec(
        source=ROOT / "docs" / "player-guide-th.md",
        output=OUTPUT_DIR / "mission-control-player-guide-th.pdf",
        title="คู่มือผู้เล่น",
        subtitle="MISSION CONTROL GAME",
        cover_note="อ่านแล้วเล่นตามได้ - พร้อมตัวอย่างการวางแผนโครงการ",
        short_title="MISSION CONTROL GAME - คู่มือผู้เล่น",
        confidentiality="สำหรับผู้เล่น - ไม่มีข้อมูลเฉลย",
        accent=YELLOW,
    ),
    ManualSpec(
        source=ROOT / "docs" / "facilitator-guide-th.md",
        output=OUTPUT_DIR / "mission-control-facilitator-guide-th.pdf",
        title="คู่มือ Facilitator",
        subtitle="MISSION CONTROL GAME",
        cover_note="Run Sheet, Sponsor Guide, Events, Scoring และ Debrief",
        short_title="MISSION CONTROL GAME - คู่มือ Facilitator",
        confidentiality="สำหรับ Facilitator เท่านั้น - มีข้อมูลลับของเกม",
        accent=ORANGE,
    ),
)


def register_fonts() -> None:
    for path in (FONT_REGULAR, FONT_MEDIUM, FONT_SEMIBOLD, FONT_BOLD):
        if not path.exists():
            raise FileNotFoundError(f"Required font not found: {path}")

    pdfmetrics.registerFont(TTFont("IBMPlexThai", str(FONT_REGULAR), shapable=True))
    pdfmetrics.registerFont(TTFont("IBMPlexThaiMedium", str(FONT_MEDIUM), shapable=True))
    pdfmetrics.registerFont(TTFont("IBMPlexThaiSemiBold", str(FONT_SEMIBOLD), shapable=True))
    pdfmetrics.registerFont(TTFont("IBMPlexThaiBold", str(FONT_BOLD), shapable=True))
    pdfmetrics.registerFontFamily(
        "IBMPlexThai",
        normal="IBMPlexThai",
        bold="IBMPlexThaiBold",
        italic="IBMPlexThai",
        boldItalic="IBMPlexThaiBold",
    )


def normalize_text(value: str) -> str:
    replacements = {
        "\u2010": "-",
        "\u2011": "-",
        "\u2012": "-",
        "\u2013": "-",
        "\u2014": "-",
        "\u2212": "-",
        "→": "->",
        "←": "<-",
    }
    for source, target in replacements.items():
        value = value.replace(source, target)
    return value


def inline_markup(value: str) -> str:
    value = normalize_text(value.strip())
    value = html.escape(value, quote=False)

    # Links are converted before the remaining lightweight Markdown markup.
    value = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        r'<link href="\2" color="#1478B8"><u>\1</u></link>',
        value,
    )
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(
        r"`([^`]+)`",
        r'<font name="IBMPlexThaiMedium" color="#0B6C9D">\1</font>',
        value,
    )
    return value


def make_styles(accent: colors.Color) -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle(
            "ThaiBody",
            parent=base["BodyText"],
            fontName="IBMPlexThai",
            fontSize=9.5,
            leading=14.4,
            textColor=INK,
            spaceAfter=5.5,
            wordWrap="CJK",
            splitLongWords=True,
        ),
        "section": ParagraphStyle(
            "ThaiSection",
            parent=base["Heading1"],
            fontName="IBMPlexThaiBold",
            fontSize=14.5,
            leading=19,
            textColor=YELLOW,
            backColor=PANEL,
            borderPadding=(7, 9, 7, 9),
            spaceBefore=13,
            spaceAfter=8,
            keepWithNext=True,
            wordWrap="CJK",
        ),
        "subsection": ParagraphStyle(
            "ThaiSubsection",
            parent=base["Heading2"],
            fontName="IBMPlexThaiSemiBold",
            fontSize=11.5,
            leading=16,
            textColor=NAVY,
            borderColor=accent,
            borderWidth=0.8,
            borderPadding=(4, 6, 4, 6),
            spaceBefore=9,
            spaceAfter=5,
            keepWithNext=True,
            wordWrap="CJK",
        ),
        "minor": ParagraphStyle(
            "ThaiMinor",
            parent=base["Heading3"],
            fontName="IBMPlexThaiSemiBold",
            fontSize=10.2,
            leading=14,
            textColor=colors.HexColor("#174D73"),
            spaceBefore=7,
            spaceAfter=4,
            keepWithNext=True,
            wordWrap="CJK",
        ),
        "bullet": ParagraphStyle(
            "ThaiBullet",
            parent=base["BodyText"],
            fontName="IBMPlexThai",
            fontSize=9.3,
            leading=13.7,
            textColor=INK,
            leftIndent=13,
            firstLineIndent=-8,
            bulletIndent=2,
            spaceAfter=2.5,
            wordWrap="CJK",
        ),
        "numbered": ParagraphStyle(
            "ThaiNumbered",
            parent=base["BodyText"],
            fontName="IBMPlexThai",
            fontSize=9.3,
            leading=13.7,
            textColor=INK,
            leftIndent=18,
            firstLineIndent=-15,
            spaceAfter=2.5,
            wordWrap="CJK",
        ),
        "quote": ParagraphStyle(
            "ThaiQuote",
            parent=base["BodyText"],
            fontName="IBMPlexThaiMedium",
            fontSize=9.5,
            leading=14.5,
            textColor=colors.HexColor("#123F5D"),
            backColor=PANEL_LIGHT,
            borderColor=CYAN,
            borderWidth=0.8,
            borderPadding=(7, 9, 7, 9),
            leftIndent=5,
            rightIndent=5,
            spaceBefore=4,
            spaceAfter=8,
            wordWrap="CJK",
        ),
        "code": ParagraphStyle(
            "ThaiCode",
            parent=base["Code"],
            fontName="IBMPlexThaiMedium",
            fontSize=8.3,
            leading=12,
            textColor=colors.HexColor("#E9F3FB"),
            backColor=NAVY,
            borderPadding=7,
            leftIndent=5,
            rightIndent=5,
            spaceBefore=4,
            spaceAfter=7,
        ),
        "table_header": ParagraphStyle(
            "ThaiTableHeader",
            parent=base["BodyText"],
            fontName="IBMPlexThaiSemiBold",
            fontSize=7.7,
            leading=10.4,
            textColor=WHITE,
            wordWrap="CJK",
            alignment=TA_LEFT,
        ),
        "table_cell": ParagraphStyle(
            "ThaiTableCell",
            parent=base["BodyText"],
            fontName="IBMPlexThai",
            fontSize=7.4,
            leading=10.4,
            textColor=INK,
            wordWrap="CJK",
            alignment=TA_LEFT,
        ),
        "toc_title": ParagraphStyle(
            "ThaiTOCTitle",
            parent=base["Heading1"],
            fontName="IBMPlexThaiBold",
            fontSize=21,
            leading=25,
            textColor=NAVY,
            spaceAfter=12,
        ),
        "toc_0": ParagraphStyle(
            "ThaiTOC0",
            parent=base["Normal"],
            fontName="IBMPlexThaiSemiBold",
            fontSize=8.4,
            leading=10.2,
            leftIndent=0,
            firstLineIndent=0,
            textColor=NAVY,
            spaceBefore=1.2,
        ),
        "toc_1": ParagraphStyle(
            "ThaiTOC1",
            parent=base["Normal"],
            fontName="IBMPlexThai",
            fontSize=8.3,
            leading=11.5,
            leftIndent=12,
            firstLineIndent=0,
            textColor=MUTED,
        ),
    }


class ManualDocTemplate(BaseDocTemplate):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._bookmark_counter = 0

    def beforeDocument(self):  # noqa: N802 - ReportLab API
        # multiBuild runs several layout passes for the table of contents.
        # Stable bookmark keys are required for the passes to converge.
        self._bookmark_counter = 0

    def afterFlowable(self, flowable):  # noqa: N802 - ReportLab API
        level = getattr(flowable, "toc_level", None)
        if level is None:
            return
        text = flowable.getPlainText()
        key = f"heading-{self._bookmark_counter}"
        self._bookmark_counter += 1
        self.canv.bookmarkPage(key)
        self.canv.addOutlineEntry(text, key, level=level, closed=False)
        self.notify("TOCEntry", (level, text, self.page, key))


def draw_cover(canvas, doc, spec: ManualSpec) -> None:
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)

    canvas.setFillColor(spec.accent)
    canvas.rect(0, height - 20 * mm, width, 5 * mm, fill=1, stroke=0)
    canvas.rect(18 * mm, 52 * mm, 3 * mm, 92 * mm, fill=1, stroke=0)

    canvas.setFont("IBMPlexThaiBold", 13)
    canvas.setFillColor(spec.accent)
    canvas.drawString(24 * mm, height - 47 * mm, spec.subtitle)

    title_style = ParagraphStyle(
        "CoverTitle",
        fontName="IBMPlexThaiBold",
        fontSize=34,
        leading=42,
        textColor=WHITE,
        wordWrap="CJK",
    )
    title = Paragraph(inline_markup(spec.title), title_style)
    title.wrapOn(canvas, 158 * mm, 60 * mm)
    title.drawOn(canvas, 24 * mm, height - 102 * mm)

    note_style = ParagraphStyle(
        "CoverNote",
        fontName="IBMPlexThaiMedium",
        fontSize=13,
        leading=20,
        textColor=colors.HexColor("#CFE2F2"),
        wordWrap="CJK",
    )
    note = Paragraph(inline_markup(spec.cover_note), note_style)
    note.wrapOn(canvas, 150 * mm, 40 * mm)
    note.drawOn(canvas, 24 * mm, height - 132 * mm)

    badge_style = ParagraphStyle(
        "CoverBadge",
        fontName="IBMPlexThaiSemiBold",
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=NAVY,
        wordWrap="CJK",
    )
    badge = Paragraph(inline_markup(spec.confidentiality), badge_style)
    badge_width, badge_height = 88 * mm, 12 * mm
    badge.wrapOn(canvas, badge_width, badge_height)
    canvas.setFillColor(spec.accent)
    canvas.roundRect(24 * mm, 56 * mm, badge_width, badge_height, 2 * mm, fill=1, stroke=0)
    badge.drawOn(canvas, 24 * mm, 58.2 * mm)

    canvas.setFont("IBMPlexThai", 9)
    canvas.setFillColor(colors.HexColor("#91A9BD"))
    canvas.drawString(24 * mm, 30 * mm, "ฉบับละเอียด - 25 สิงหาคม 2569")
    canvas.drawRightString(width - 18 * mm, 30 * mm, "MISSION CONTROL")
    canvas.restoreState()


def draw_body_page(canvas, doc, spec: ManualSpec) -> None:
    width, height = A4
    canvas.saveState()
    canvas.setStrokeColor(spec.accent)
    canvas.setLineWidth(1.2)
    canvas.line(18 * mm, height - 13 * mm, width - 18 * mm, height - 13 * mm)

    canvas.setFillColor(NAVY)
    canvas.setFont("IBMPlexThaiSemiBold", 7.5)
    canvas.drawString(18 * mm, height - 10 * mm, spec.short_title)

    canvas.setFillColor(MUTED)
    canvas.setFont("IBMPlexThai", 7.5)
    canvas.drawString(18 * mm, 9 * mm, spec.confidentiality)
    canvas.drawRightString(width - 18 * mm, 9 * mm, f"หน้า {doc.page}")
    canvas.restoreState()


def split_table_row(line: str) -> list[str]:
    stripped = line.strip().strip("|")
    return [cell.strip() for cell in stripped.split("|")]


def is_table_separator(line: str) -> bool:
    cells = split_table_row(line)
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells)


def is_block_start(lines: list[str], index: int) -> bool:
    line = lines[index]
    stripped = line.strip()
    if not stripped:
        return True
    if stripped.startswith(("#", ">", "```")):
        return True
    if re.match(r"^[-*+]\s+", stripped) or re.match(r"^\d+\.\s+", stripped):
        return True
    if stripped.startswith("|") and index + 1 < len(lines) and is_table_separator(lines[index + 1]):
        return True
    return False


def column_widths(rows: list[list[str]], usable_width: float) -> list[float]:
    columns = max(len(row) for row in rows)
    lengths = []
    for col in range(columns):
        max_length = max((len(row[col]) if col < len(row) else 0) for row in rows)
        lengths.append(min(max(max_length, 8), 42))

    if columns == 2:
        lengths[0] = min(lengths[0], 22)
        lengths[1] = max(lengths[1], 30)
    elif columns >= 4:
        lengths = [min(value, 26) for value in lengths]

    total = sum(lengths) or columns
    return [usable_width * value / total for value in lengths]


def make_table(rows: list[list[str]], styles: dict[str, ParagraphStyle], usable_width: float):
    column_count = max(len(row) for row in rows)
    normalized_rows = [row + [""] * (column_count - len(row)) for row in rows]
    data = []
    for row_index, row in enumerate(normalized_rows):
        style = styles["table_header"] if row_index == 0 else styles["table_cell"]
        data.append([Paragraph(inline_markup(cell), style) for cell in row])

    table = LongTable(
        data,
        colWidths=column_widths(normalized_rows, usable_width),
        repeatRows=1,
        hAlign="LEFT",
        splitByRow=1,
        spaceBefore=4,
        spaceAfter=8,
    )
    commands = [
        ("BACKGROUND", (0, 0), (-1, 0), PANEL),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for row_index in range(1, len(data)):
        background = colors.white if row_index % 2 else colors.HexColor("#F3F7FA")
        commands.append(("BACKGROUND", (0, row_index), (-1, row_index), background))
    table.setStyle(TableStyle(commands))
    return table


def markdown_story(markdown_text: str, styles: dict[str, ParagraphStyle], usable_width: float):
    lines = markdown_text.splitlines()
    story = []
    index = 0

    while index < len(lines):
        stripped = lines[index].strip()

        if not stripped:
            index += 1
            continue

        if stripped.startswith("# "):
            # The H1 is represented by the designed cover page.
            index += 1
            continue

        if stripped.startswith("### "):
            title = stripped[4:].strip()
            paragraph = Paragraph(inline_markup(title), styles["subsection"])
            story.append(paragraph)
            index += 1
            continue

        if stripped.startswith("## "):
            title = stripped[3:].strip()
            paragraph = Paragraph(inline_markup(title), styles["section"])
            paragraph.toc_level = 0
            story.append(paragraph)
            index += 1
            continue

        if stripped.startswith("#### "):
            title = stripped[5:].strip()
            story.append(Paragraph(inline_markup(title), styles["minor"]))
            index += 1
            continue

        if stripped.startswith("```"):
            index += 1
            code_lines = []
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code_lines.append(normalize_text(lines[index]))
                index += 1
            if index < len(lines):
                index += 1
            story.append(XPreformatted("\n".join(code_lines), styles["code"]))
            continue

        if stripped.startswith(">"):
            quote_lines = []
            while index < len(lines) and lines[index].strip().startswith(">"):
                quote_lines.append(lines[index].strip()[1:].strip())
                index += 1
            story.append(Paragraph(inline_markup(" ".join(quote_lines)), styles["quote"]))
            continue

        if stripped.startswith("|") and index + 1 < len(lines) and is_table_separator(lines[index + 1]):
            rows = [split_table_row(lines[index])]
            index += 2
            while index < len(lines) and lines[index].strip().startswith("|"):
                rows.append(split_table_row(lines[index]))
                index += 1
            story.append(make_table(rows, styles, usable_width))
            continue

        bullet_match = re.match(r"^[-*+]\s+(.*)$", stripped)
        if bullet_match:
            while index < len(lines):
                current = lines[index].strip()
                match = re.match(r"^[-*+]\s+(.*)$", current)
                if not match:
                    break
                text = match.group(1)
                if text.startswith("[ ] "):
                    text = "□ " + text[4:]
                elif text.startswith("[x] ") or text.startswith("[X] "):
                    text = "✓ " + text[4:]
                story.append(Paragraph(inline_markup(text), styles["bullet"], bulletText="•"))
                index += 1
            story.append(Spacer(1, 2))
            continue

        numbered_match = re.match(r"^(\d+)\.\s+(.*)$", stripped)
        if numbered_match:
            while index < len(lines):
                current = lines[index].strip()
                match = re.match(r"^(\d+)\.\s+(.*)$", current)
                if not match:
                    break
                number, text = match.groups()
                story.append(Paragraph(f"<b>{number}.</b> {inline_markup(text)}", styles["numbered"]))
                index += 1
            story.append(Spacer(1, 2))
            continue

        paragraph_lines = [stripped]
        index += 1
        while index < len(lines) and not is_block_start(lines, index):
            paragraph_lines.append(lines[index].strip())
            index += 1
        story.append(Paragraph(inline_markup(" ".join(paragraph_lines)), styles["body"]))

    return story


def create_pdf(spec: ManualSpec) -> tuple[int, int]:
    styles = make_styles(spec.accent)
    page_width, page_height = A4
    left_margin = right_margin = 18 * mm
    top_margin = 18 * mm
    bottom_margin = 16 * mm
    usable_width = page_width - left_margin - right_margin

    doc = ManualDocTemplate(
        str(spec.output),
        pagesize=A4,
        leftMargin=left_margin,
        rightMargin=right_margin,
        topMargin=top_margin,
        bottomMargin=bottom_margin,
        title=spec.title,
        author="Mission Control Game",
        subject=spec.confidentiality,
        creator="Mission Control Game PDF Generator",
    )

    cover_frame = Frame(0, 0, page_width, page_height, id="cover-frame", showBoundary=0)
    body_frame = Frame(
        left_margin,
        bottom_margin,
        usable_width,
        page_height - top_margin - bottom_margin,
        id="body-frame",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        showBoundary=0,
    )
    doc.addPageTemplates(
        [
            PageTemplate(
                id="Cover",
                frames=[cover_frame],
                onPage=lambda canvas, current_doc: draw_cover(canvas, current_doc, spec),
            ),
            PageTemplate(
                id="Body",
                frames=[body_frame],
                onPage=lambda canvas, current_doc: draw_body_page(canvas, current_doc, spec),
            ),
        ]
    )

    toc = TableOfContents()
    toc.levelStyles = [styles["toc_0"], styles["toc_1"]]
    toc.dotsMinLevel = 0

    markdown_text = spec.source.read_text(encoding="utf-8")
    story = [
        Spacer(1, 1),
        NextPageTemplate("Body"),
        PageBreak(),
        Paragraph("สารบัญ", styles["toc_title"]),
        toc,
        PageBreak(),
    ]
    story.extend(markdown_story(markdown_text, styles, usable_width))

    spec.output.parent.mkdir(parents=True, exist_ok=True)
    doc.multiBuild(story)

    reader = PdfReader(str(spec.output))
    source_lines = len(markdown_text.splitlines())
    return len(reader.pages), source_lines


def main() -> None:
    register_fonts()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for spec in MANUALS:
        pages, source_lines = create_pdf(spec)
        print(f"CREATED {spec.output.relative_to(ROOT)} | {pages} pages | {source_lines} source lines")


if __name__ == "__main__":
    main()
