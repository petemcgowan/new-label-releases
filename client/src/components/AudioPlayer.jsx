import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "../styles/styles.css";
import { ReleaseContext } from "../contexts/ReleaseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ tracks }) => {
  // State
  // const [trackIndex, setTrackIndex] = useState(0);

  // const [isPlaying, setIsPlaying] = useState(false);
  const { state, dispatch } = useContext(ReleaseContext);
  // Destructure for conciseness
  // const { title, artist, color, image, audioSrc } = tracks[trackIndex];
  // const audioSrc = "";

  // Refs
  // const audioRef = useRef(new Audio(audioSrc));
  // const intervalRef = useRef();
  const isReady = useRef(false);

  // const startTimer = () => {
  //   // Clear any timers already running
  //   clearInterval(intervalRef.current);

  //   intervalRef.current = setInterval(() => {
  //     if (audioRef.current.ended) {
  //       toNextTrack();
  //     } else {
  //       setTrackProgress(audioRef.current.currentTime);
  //     }
  //   }, [1000]);
  // };
  // --------------------------------

  const toPrevTrack = () => {
    /*Pete todo:
     * Need to dispatch of "PLAY" type, but with the song ID from the previous track.
     * If this is the 0th element, don't do anything.
     * Output the current
     */

    if (state.trackIndex - 1 < 0) {
      // dispatch({ type: "SET_TRACK_INDEX", trackIndex: 0 }); // this doesn't roll around
      // dispatch({ type: "SET_TRACK_INDEX", trackIndex: state.releases.length - 1 }); // this rolls around
      dispatch({
        type: "PLAY",
        songId: state.releases[0].id,
        trackIndex: 0,
      });
    } else {
      // dispatch({ type: "SET_TRACK_INDEX", trackIndex: state.trackIndex - 1 }); // this doesn't roll around
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

  /* Effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of the DOM node between the time
  that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll want to use useLayoutEffect.
  And this actually causes user agent permission issues on mobile if using useEffect*/
  // useLayoutEffect(() => {
  //   console.log("useEffect(isPlaying): audioRef:" + audioSrc);
  //   if (isPlaying) {
  //     audioRef.current.play();
  //     // startTimer();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  // useLayoutEffect(() => {
  //   console.log("useEffect(trackIndex): audioRef:" + audioSrc);

  //   audioRef.current.pause();
  //   console.log("useEffect, before changing track");
  //   audioRef.current = new Audio(audioSrc);

  //   if (isReady.current) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //     // startTimer();
  //   } else {
  //     // Set the isReady ref as true for the next pass
  //     isReady.current = true;
  //   }
  // }, [trackIndex]);

  // useLayoutEffect(() => {
  //   console.log("useEffect([]]): audioRef:" + audioSrc);
  //   // Pause and clean up on unmount
  //   return () => {
  //     audioRef.current.pause();
  //   };
  // }, []);

  const setVolume = useCallback((e) => {
    dispatch({ type: "SET_VOLUME", volume: e.target.value });
  }, []);

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
