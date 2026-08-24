import type { PropsWithChildren } from "react";
import { PixelButton } from "./ui";

export function Modal({ title, onClose, children }: PropsWithChildren<{ title: string; onClose: () => void }>) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
    <div className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
      <header><h2>{title}</h2><PixelButton variant="ghost" onClick={onClose} aria-label="Close">×</PixelButton></header>
      <div>{children}</div>
    </div>
  </div>;
}
