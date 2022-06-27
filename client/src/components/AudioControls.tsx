import { MouseEventHandler } from "react";
// eslint-disable-next-line
import React from 'react'
import { ReactComponent as Play } from "../images/player/play.svg";
import { ReactComponent as Pause } from "../images/player/pause.svg";
import { ReactComponent as Next } from "../images/player/next.svg";
import { ReactComponent as Prev } from "../images/player/prev.svg";

// type onPlayPauseClickType = (a: boolean) => void;

interface AudioControlsProps {
  isPlaying: boolean;
  // eslint-disable-next-line no-unused-vars
  onPlayPauseClick: (a: boolean) => void;
  onPrevClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onNextClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}: AudioControlsProps) => (
  <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Prev />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Pause />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <Play />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <Next />
    </button>
  </div>
);

export default AudioControls;
