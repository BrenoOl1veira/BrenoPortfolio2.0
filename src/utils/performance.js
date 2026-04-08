import { useEffect, useState } from "react";

const getEnhancedGraphicsSupport = () => {
  if (typeof window === "undefined") return false;

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const allowsMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const hasEnoughMemory =
    typeof navigator.deviceMemory !== "number" || navigator.deviceMemory >= 4;
  const isSlowConnection =
    typeof navigator.connection?.saveData === "boolean" && navigator.connection.saveData;

  return isDesktop && allowsMotion && hasEnoughMemory && !isSlowConnection;
};

export const useEnhancedGraphics = () => {
  const [enhancedGraphics, setEnhancedGraphics] = useState(getEnhancedGraphicsSupport);

  useEffect(() => {
    const updateMode = () => setEnhancedGraphics(getEnhancedGraphicsSupport());

    updateMode();
    window.addEventListener("resize", updateMode);

    return () => {
      window.removeEventListener("resize", updateMode);
    };
  }, []);

  return enhancedGraphics;
};
