import { ReleaseContext } from "../contexts/ReleaseContext";
import React, { useContext } from "react";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayPause = ({ playing, songId, isCurrentSong, visible }) => {
  const { dispatch } = useContext(ReleaseContext);
  const style = { visibility: visible ? "visible" : "hidden" };

  if (isCurrentSong && playing) {
    return (
      <FontAwesomeIcon
        icon={faPause}
        onClick={() => dispatch({ type: "PAUSE" })}
        style={style}
      />
    );
  } else {
    return (
      <FontAwesomeIcon
        icon={faPlay}
        onClick={() => dispatch({ type: "PLAY", songId })}
        style={style}
      />
    );
  }
};

export default PlayPause;
