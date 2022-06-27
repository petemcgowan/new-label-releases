import React, { useContext } from "react";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "../styles/styles.css";
import { ReleaseContext } from "../contexts/ReleaseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = () => {
  const { state, dispatch } = useContext(ReleaseContext);

  const toPrevTrack = () => {
    if (state.trackIndex - 1 < 0) {
      dispatch({
        type: "PLAY",
        songId: state.releases[0].id,
        trackIndex: 0,
      });
    } else {
      dispatch({
        type: "PLAY",
        songId: state.releases[state.trackIndex - 1].id,
        trackIndex: state.trackIndex - 1,
      });
    }
    console.log(
      "toPrevTrack:state.trackIndex:" +
        state.trackIndex +
        ", state.currentSongId:" +
        state.currentSongId +
        ", state.releases[trackIndex].id:" +
        state.releases[state.trackIndex].id
    );
  };

  const toNextTrack = () => {
    //TODO I need to store this in the release context.  SET_TRACK_INDEX and trackIndex.  Use a dispatch here instead  It also needs to be called on "individual play/pause".
    if (state.trackIndex < state.releases.length - 1) {
      // dispatch({ type: "SET_TRACK_INDEX", trackIndex: state.trackIndex + 1 });
      dispatch({
        type: "PLAY",
        songId: state.releases[state.trackIndex + 1].id,
        trackIndex: state.trackIndex + 1,
      });
    } else {
      // dispatch({ type: "SET_TRACK_INDEX", trackIndex: 0 });
      dispatch({
        type: "PLAY",
        songId: state.releases[0].id,
        trackIndex: 0,
      });
    }
    console.log(
      "toNextTrack:state.trackIndex:" +
        state.trackIndex +
        ", state.currentSongId:" +
        state.currentSongId +
        ", state.releases[trackIndex].id:" +
        state.releases[state.trackIndex].id
    );
  };

  let currentRelease;
  if (state.releases) {
    currentRelease = state.releases.find(({ id }) => {
      console.log(
        "Audioplayer, currentRelease set:" +
          JSON.stringify(currentRelease) +
          ", state.currentSongId:" +
          state.currentSongId
      );
      return id === state.currentSongId;
    });
  }

  if (!currentRelease) {
    console.log("Playbar: !currentRelease");
    // return <div className="Playbar" css={CSS} />;
  }

  const playOrPause = () => {
    state.playing ? dispatch({ type: "PAUSE" }) : dispatch({ type: "PLAY" });
  };

  // eslint-disable-next-line no-unused-vars
  let playIcon = (
    <FontAwesomeIcon
      icon={faPlay}
      onClick={() => dispatch({ type: "PLAY", currentRelease })}
      style={{ transform: state.playing ? "" : "translateX(1.5px)" }}
    />
  );
  if (state.playing) {
    playIcon = (
      <FontAwesomeIcon
        icon={faPause}
        onClick={() => dispatch({ type: "PAUSE" })}
        style={{ transform: state.playing ? "" : "translateX(1.5px)" }}
      />
    );
  }

  return (
    <div className="audio-player">
      {/* <div className="left">
        {currentRelease && (
          <React.Fragment>
            <div>{currentRelease.trackName}</div>

            <div className="artist">{currentRelease.artists}</div>
          </React.Fragment>
        )}
      </div> */}
      <div className="track-info">
        {currentRelease && (
          <React.Fragment>
            <img
              className="artwork"
              src={currentRelease.releaseMidImage /*image*/}
              alt={`track artwork for ${currentRelease.trackName} by ${currentRelease.artists}`}
            />
            <h2 className="title">{currentRelease.trackName}</h2>
            <h3 className="artist">{currentRelease.artists}</h3>
            <AudioControls
              isPlaying={state.playing}
              onPrevClick={toPrevTrack}
              onNextClick={toNextTrack}
              onPlayPauseClick={playOrPause}
            />
          </React.Fragment>
        )}
      </div>
      <Backdrop
        trackIndex={state.trackIndex}
        activeColor="#CFE3E2"
        isPlaying={state.playing}
      />
    </div>
  );
};
//{color} TODO color was previously pass thru activeColor, but I'm not sure Ill be using that here
export default AudioPlayer;
