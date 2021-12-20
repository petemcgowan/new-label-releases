import React, { useContext, useRef, useLayoutEffect, useReducer, useCallback } from "react";
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

  const audioRef = useRef(new Audio("https://p.scdn.co/mp3-preview/ef83054a53d976a0e5e947b39cff362a2db7c631?cid=1d62fc4c9282424c8d5611d95669ba0d"));


  let currentRelease: IReleaseTrack | undefined;
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
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.playing, state.currentSongId]);

  useLayoutEffect(() => {
    if (currentRelease && audioRef.current)
      audioRef.current.volume = state.volume;
  }, [state.volume]);

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
            {state.releases.map((release) => {
              return <ReleaseDetails release={release} key={release.id} />;
            })}
          </tbody>
        </table>
        <audio
          ref={audioRef}
          src={currentRelease ? currentRelease.previewUrl : undefined}
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
              time: (e.target as HTMLAudioElement).currentTime,
            });
          }}
        />
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
      <AudioPlayer tracks={tracks} />
    </div>
  ) : (
    <div className="empty">No releases to ogle.</div>
  );
};

export default ReleaseList;


/*


Type '{ ref: RefObject<HTMLAudioElement>; src: string | undefined; type: string; onLoadedMetadata: () => void; onTimeUpdate: (e: SyntheticEvent<HTMLAudioElement, Event>) => void; }' is not assignable to type 'DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>'.
  Property 'type' does not exist on type 'DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>'.ts(2322)
(JSX attribute) type: string

*/