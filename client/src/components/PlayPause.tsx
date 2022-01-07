import { ReleaseContext } from "../contexts/ReleaseContext";
import React, { useContext } from "react";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayPauseProps {
  playing : boolean;
  songId : string;
  isCurrentSong: boolean;
  visible : boolean;
  trackIndex: number
}

const PlayPause = ({ playing, songId, isCurrentSong, visible, trackIndex } : PlayPauseProps) => {
  const { dispatch } = useContext(ReleaseContext);
  const style = { visibility: visible ? "visible" : "hidden" };

  if (isCurrentSong && playing) {
    return (
      <FontAwesomeIcon
        icon={faPause}
        onClick={() => {
          console.log ("Play icon PAUSE, songId:" + songId + ", trackIndex:" +  trackIndex);
          dispatch({ type: "PAUSE" })}
        }
        // style={style}  //pete todo always visible, but I actually prefer this?
        />
    );
  } else {
    return (
      <FontAwesomeIcon
        icon={faPlay}
        onClick={() => {
          console.log ("Play icon PLAY, songId:" + songId + ", trackIndex:" +  trackIndex);
          dispatch({ type: "PLAY", songId, trackIndex })}
        }
        // style={style}
      />
    );
  }
};

export default PlayPause;
