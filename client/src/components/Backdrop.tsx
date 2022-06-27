import React, { useEffect } from "react";

interface BackdropProps {
  activeColor: string;
  trackIndex: number;
  isPlaying: boolean;
}

const Backdrop = ({ activeColor, trackIndex, isPlaying }: BackdropProps) => {
  useEffect(() => {
    document.documentElement.style.setProperty("--active-color", activeColor);
  }, [trackIndex, activeColor]);

  return <div className={`color-backdrop ${isPlaying ? "playing" : "idle"}`} />;
};

export default Backdrop;
