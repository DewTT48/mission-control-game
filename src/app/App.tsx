import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { isFacilitatorUnlocked, lockFacilitator, unlockFacilitator } from "./auth";
import { hasSavedTeam, resetTeamState } from "./storage";
import { useState } from "react";
import { Panel, PixelButton } from "../components/ui";
import PlayerApp from "../modes/player/PlayerApp";
import FacilitatorApp from "../modes/facilitator/FacilitatorApp";

function Landing() {
  const navigate = useNavigate();
  const [hasSave, setHasSave] = useState(hasSavedTeam());
  const reset = () => {
    if (!window.confirm("ล้างข้อมูลทีมในเครื่องนี้? การดำเนินการนี้ย้อนกลับไม่ได้\n\nReset local team data? This cannot be undone.")) return;
    resetTeamState();
    setHasSave(false);
  };
  return <main className="landing">
    <div className="scanlines" />
    <div className="landing-inner">
      <div className="scenario-badge">SCENARIO 01 — INNOVATION DAY</div>
      <h1 className="logo">MISSION<br />CONTROL</h1>
      <p className="tagline">PLAN. PRIORITIZE. DELIVER.</p>
      <p className="thai-subtitle">เกมจำลองการวางแผนและบริหารงาน</p>
      <div className="landing-actions">
        <PixelButton onClick={() => navigate("/player")}>PLAYER MODE / โหมดผู้เล่น</PixelButton>
        <PixelButton variant="secondary" onClick={() => navigate("/facilitator-access")}>FACILITATOR MODE / โหมดวิทยากร</PixelButton>
        {hasSave && <PixelButton variant="ghost" onClick={() => navigate("/player")}>RESUME MISSION / เล่นต่อ</PixelButton>}
        {hasSave && <PixelButton variant="danger" onClick={reset}>RESET LOCAL DATA / ล้างข้อมูลเครื่องนี้</PixelButton>}
      </div>
      <p className="facilitated-note">HUMAN-FACILITATED TEAM LEARNING EXPERIENCE</p>
    </div>
  </main>;
}

function FacilitatorAccess() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [denied, setDenied] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (unlockFacilitator(pin)) navigate("/facilitator", { replace: true });
    else { setDenied(true); setPin(""); }
  };
  return <main className="center-screen">
    <Panel className="access-panel" title="GAME MASTER ACCESS / เข้าสู่โหมดวิทยากร">
      <form onSubmit={submit} className="pin-form">
        <label htmlFor="pin">ENTER 4-DIGIT PIN<br /><span>กรอกรหัส PIN 4 หลัก</span></label>
        <input id="pin" className="pin-input" inputMode="numeric" autoComplete="off" pattern="[0-9]{4}" maxLength={4} value={pin} onChange={(event) => { setPin(event.target.value.replace(/\D/g, "").slice(0, 4)); setDenied(false); }} autoFocus />
        {denied && <div className="access-denied" role="alert"><strong>ACCESS DENIED</strong><span>PIN ไม่ถูกต้อง — TRY AGAIN / ลองอีกครั้ง</span></div>}
        <PixelButton type="submit" disabled={pin.length !== 4}>ENTER CONTROL ROOM / เข้าห้องควบคุม</PixelButton>
        <PixelButton type="button" variant="ghost" onClick={() => navigate("/")}>BACK / กลับ</PixelButton>
      </form>
    </Panel>
  </main>;
}

function FacilitatorGuard() {
  if (!isFacilitatorUnlocked()) return <Navigate to="/facilitator-access" replace />;
  return <FacilitatorApp
    onLock={() => { lockFacilitator(); window.location.hash = "#/facilitator-access"; }}
    onExit={() => { lockFacilitator(); window.location.hash = "#/"; }}
  />;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/player" element={<PlayerApp />} />
    <Route path="/facilitator-access" element={<FacilitatorAccess />} />
    <Route path="/facilitator" element={<FacilitatorGuard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
