/** @jsx jsx */
import React, { useContext, useCallback } from "react";
import { css, jsx } from "@emotion/core";
import { ReleaseContext } from "../contexts/ReleaseContext";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formatTime = (inputSeconds) => {
  let seconds = Math.floor(inputSeconds % 60);
  if (seconds < 10) seconds = `0${seconds}`;

  const minutes = Math.floor(inputSeconds / 60);

  return `${minutes}:${seconds}`;
};

const handleProgress = (currentTime, duration) =>
  600 * (currentTime / duration);

const Playbar = () => {
  const { state, dispatch } = useContext(ReleaseContext);

  const setVolume = useCallback((e) => {
    dispatch({ type: "SET_VOLUME", volume: e.target.value });
  });

  let currentRelease;
  if (state.releases) {
    currentRelease = state.releases.find(({ id }) => {
      return id === state.currentSongId;
    });
  }

  if (!currentRelease) {
    console.log("Playbar: !currentRelease");
    return <div className="Playbar" css={CSS} />;
  }

  const playOrPause = () => {
    state.playing ? dispatch({ type: "PAUSE" }) : dispatch({ type: "PLAY" });
  };

  let playIcon;
  if (state.playing) {
    playIcon = (
      <FontAwesomeIcon
        icon={faPause}
        onClick={() => dispatch({ type: "PAUSE" })}
        style={{ transform: state.playing ? "" : "translateX(1.5px)" }}
      />
    );
  } else {
    playIcon = (
      <FontAwesomeIcon
        icon={faPlay}
        onClick={() => dispatch({ type: "PLAY", currentRelease })}
        style={{ transform: state.playing ? "" : "translateX(1.5px)" }}
      />
    );
  }
  let volumeUp = <FontAwesomeIcon icon={faVolumeUp} />;

  return (
    <div className="Playbar" css={CSS}>
      <div className="left">
        {currentRelease && (
          <>
            <div>{currentRelease.trackName}</div>

            <div className="artist">{currentRelease.artists}</div>
          </>
        )}
      </div>

      <div className="middle">
        <div className="play-pause-circle" onClick={playOrPause}>
          {playIcon}
        </div>

        <div style={{ marginTop: 2.5 }}>
          <span>{formatTime(Math.floor(state.currentTime))}</span>

          <div className="progress-container">
            <div
              className="bar"
              style={{
                width: handleProgress(state.currentTime, state.duration) || 100,
              }}
            />
          </div>

          <span>{formatTime(state.duration)}</span>
        </div>
      </div>

      <div className="right">
        {volumeUp}
        <input
          type="range"
          min="0"
          max="1"
          value={state.volume}
          step="0.01"
          style={{ marginLeft: 10 }}
          onChange={setVolume}
        />
      </div>
    </div>
  );
};

const CSS = css`
  position: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #282828;
  z-index: 99;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    width: 200px;

    .artist {
      font-size: 14px;
      color: "#999999";
      margin-top: 5px;
    }
  }

  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;

    .fa-play,
    .fa-pause {
      font-size: 14px;
    }

    .play-pause-circle {
      width: 35px;
      height: 35px;
      border: 1px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .progress-container {
      width: 600px;
      height: 5px;
      position: relative;
      background-color: #4f4f4f;
      margin-top: 10px;
      display: inline-flex;
      margin: 10px 10px 0px 10px;

      .bar {
        height: 100%;
        /* height: 100px; */
        background-color: rgb(167 167 167);
      }
    }
  }

  .right {
    .fa-volume-up,
    .fa-volume-off {
      font-size: 20px;
    }
  }
`;

export default Playbar;
