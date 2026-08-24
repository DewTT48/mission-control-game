import { FACILITATOR_PIN, STORAGE_KEYS } from "./config";

export const isFacilitatorUnlocked = () => sessionStorage.getItem(STORAGE_KEYS.facilitatorAuth) === "true";
export const unlockFacilitator = (pin: string) => {
  if (pin !== FACILITATOR_PIN) return false;
  sessionStorage.setItem(STORAGE_KEYS.facilitatorAuth, "true");
  return true;
};
export const lockFacilitator = () => sessionStorage.removeItem(STORAGE_KEYS.facilitatorAuth);
