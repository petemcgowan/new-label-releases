import { ReleaseContext } from "../contexts/ReleaseContext";
// eslint-disable-next-line
import React from "react";
import { useContext } from "react";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayPauseProps {
  playing: boolean;
  songId: string;
  isCurrentSong: boolean;
  visible: boolean;
  trackIndex: number;
}

const PlayPause = ({
  playing,
  songId,
  isCurrentSong,
  trackIndex,
}: PlayPauseProps) => {
  const { dispatch } = useContext(ReleaseContext);

  if (isCurrentSong && playing) {
    return (
      <FontAwesomeIcon
        icon={faPause}
        style={{ fontSize: "24px" }}
        onClick={() => {
          console.log(
            "Play icon PAUSE, songId:" + songId + ", trackIndex:" + trackIndex
          );
          dispatch({ type: "PAUSE" });
        }}
      />
    );
  } else {
    return (
      <FontAwesomeIcon
        icon={faPlay}
        style={{ fontSize: "24px" }}
        onClick={() => {
          console.log(
            "Play icon PLAY, songId:" + songId + ", trackIndex:" + trackIndex
          );
          dispatch({ type: "PLAY", songId, trackIndex });
        }}
        // style={style}
      />
    );
  }
};

export default PlayPause;
