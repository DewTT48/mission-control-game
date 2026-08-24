import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

export function PixelButton({ className = "", variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }) {
  return <button className={`pixel-button ${variant} ${className}`} {...props} />;
}

export function Panel({ title, action, className = "", children }: PropsWithChildren<{ title?: string; action?: ReactNode; className?: string }>) {
  return <section className={`panel ${className}`}>
    {(title || action) && <header className="panel-title"><span>{title}</span>{action}</header>}
    <div className="panel-body">{children}</div>
  </section>;
}

export function Bilingual({ th, en }: { th: string; en: string }) {
  return <span className="bilingual"><span>{th}</span><small>{en}</small></span>;
}

export function Badge({ tone = "muted", children }: PropsWithChildren<{ tone?: "green" | "blue" | "orange" | "purple" | "yellow" | "muted" }>) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function CapacityBar({ used, available = 6 }: { used: number; available?: number }) {
  const ratio = available === 0 ? (used ? 2 : 0) : used / available;
  const tone = ratio > 1 ? "over" : ratio > 2 / 3 ? "busy" : "ok";
  return <div className="capacity-wrap" aria-label={`${used} of ${available} hours`}>
    <div className="capacity-track"><span className={tone} style={{ width: `${Math.min(ratio * 100, 100)}%` }} /></div>
    <strong>{used}/{available}H{used > available ? ` +${used - available}H!` : ""}</strong>
  </div>;
}

export function Field({ label, children, hint }: PropsWithChildren<{ label: string; hint?: string }>) {
  return <label className="field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

export function SaveStatus({ timestamp }: { timestamp: string }) {
  return <span className="save-status" title={timestamp}>◆ บันทึกในเครื่องแล้ว / Saved locally</span>;
}
