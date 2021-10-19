import React, { useContext, useRef, useEffect } from "react";
import ReleaseDetails from "./ReleaseDetails";
import { ReleaseContext } from "../contexts/ReleaseContext";

import "../styles/uiElements.scss";
import "../styles/homepage.scss";

const ReleaseList = () => {
  const { state, dispatch } = useContext(ReleaseContext);

  const audioRef = useRef();

  let currentRelease;
  if (state.releases) {
    currentRelease = state.releases.find(({ id }) => {
      return id === state.currentSongId;
    });
  }
  useEffect(() => {
    if (currentRelease && audioRef.current) {
      if (state.playing) {
        audioRef.current.load();
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.playing, state.currentSongId]);

  useEffect(() => {
    if (currentRelease && audioRef.current)
      audioRef.current.volume = state.volume;
  }, [state.volume]);

  return state.releases && state.releases.length ? (
    // <div className="release-list">
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <td />
              <td />
              <td>Artist</td>
              <td>Track Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {state.releases.map((release) => {
              return <ReleaseDetails release={release} key={release.id} />;
            })}
          </tbody>
        </table>
        <audio
          ref={audioRef}
          src={currentRelease ? currentRelease.previewUrl : null}
          type="audio/mpeg"
          onLoadedMetadata={() => {
            dispatch({
              type: "SET_DURATION",
              duration: audioRef.current.duration,
            });
          }}
          onTimeUpdate={(e) => {
            dispatch({ type: "SET_CURRENT_TIME", time: e.target.currentTime });
          }}
        />
      </div>
    </div>
  ) : (
    <div className="empty">No releases to ogle.</div>
  );
};

export default ReleaseList;
