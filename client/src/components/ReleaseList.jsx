import React, {
  useContext,
  useRef,
  useLayoutEffect,
  useReducer,
  useCallback,
  useState,
} from "react";
import ReleaseDetails from "./ReleaseDetails";
import { ReleaseContext } from "../contexts/ReleaseContext";

import { initialRCState } from "../cratestate/RCState";
import { rcReducer } from "../cratestate/RCReducer";
import { RCContext } from "../cratestate/RCContext";

import "../styles/uiElements.scss";
import "../styles/homepage.scss";
import { IRelease, IReleaseTrack } from "../types/interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import tracks from "../data/tracks";
import AudioPlayer from "./AudioPlayer";

const ReleaseList = () => {
  const { state, dispatch } = useContext(ReleaseContext);
  // useRef is the audio element.  It stores the <audio> reference in the .current field.  so audioRef.current.load() is saying call the load method on the audio element;

  // const audioRef = useRef<HTMLAudioElement>(null);
  const setVolume = useCallback((e) => {
    dispatch({ type: "SET_VOLUME", volume: e.target.value });
  }, []);
  const [trackProgress, setTrackProgress] = useState(0);

  const audioRef = useRef(
    new Audio(
      "https://p.scdn.co/mp3-preview/ef83054a53d976a0e5e947b39cff362a2db7c631?cid=1d62fc4c9282424c8d5611d95669ba0d"
    )
  );
  const intervalRef = useRef();

  const currentPercentage = state.duration
    ? `${(trackProgress / state.duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  // let currentRelease: IReleaseTrack | undefined;
  let currentRelease;
  if (state.releases) {
    currentRelease = state.releases.find(({ id }) => {
      return id === state.currentSongId;
    });
  }

  // One of the key differences is that useLayoutEffect gets executed right after a React component render lifecycle, and before useEffect gets triggered.  It's specifically for DOM manipulation like useRef
  useLayoutEffect(() => {
    if (currentRelease && audioRef.current) {
      if (state.playing) {
        audioRef.current.load();
        audioRef.current.play();
        startTimer();
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.playing, state.currentSongId]);

  useLayoutEffect(() => {
    if (currentRelease && audioRef.current)
      audioRef.current.volume = state.volume;
  }, [state.volume]);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        // toNextTrack();  //TODO include this?
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!state.playing) {
      // setIsPlaying(true);
      dispatch({ type: "PLAY" }); // Pete todo, does this work?  Should have extra params no?
    }
    startTimer();
  };

  let volumeUp = <FontAwesomeIcon icon={faVolumeUp} />;

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
            {state.releases.map((release, index) => {
              return (
                <ReleaseDetails
                  release={release}
                  key={release.id}
                  trackIndex={index}
                />
              );
            })}
          </tbody>
        </table>
        <audio
          ref={audioRef}
          // src={currentRelease ? currentRelease.openSpotUrl : undefined} // full version (if available)
          src={currentRelease ? currentRelease.previewUrl : undefined} // preview version
          // type="audio/mpeg"   //this causes a typescript error
          onLoadedMetadata={() => {
            if (null !== audioRef.current) {
              dispatch({
                type: "SET_DURATION",
                duration: audioRef.current.duration,
              });
            }
          }}
          onTimeUpdate={(e) => {
            dispatch({
              type: "SET_CURRENT_TIME",
              time: e.target.currentTime,
            });
          }}
        />
      </div>
      <AudioPlayer tracks={tracks} />
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
      <input
        type="range"
        value={trackProgress}
        step="1"
        min="0"
        max={state.duration ? state.duration : `${state.duration}`}
        className="progress"
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
    </div>
  ) : (
    <div className="empty">No releases to ogle.</div>
  );
};

export default ReleaseList;
