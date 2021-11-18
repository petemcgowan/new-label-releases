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
}

const PlayPause = ({ playing, songId, isCurrentSong, visible } : PlayPauseProps) => {
  const { dispatch } = useContext(ReleaseContext);
  const style = { visibility: visible ? "visible" : "hidden" };

  if (isCurrentSong && playing) {
    return (
      <FontAwesomeIcon
        icon={faPause}
        onClick={() => dispatch({ type: "PAUSE" })}
        // style={style}  //pete todo always visible, but I actually prefer this?
        />
    );
  } else {
    return (
      <FontAwesomeIcon
        icon={faPlay}
        onClick={() => dispatch({ type: "PLAY", songId })}
        // style={style}
      />
    );
  }
};

export default PlayPause;

/* TODO delete temp

Get me ANY style that works.  I need to see ANY working example, then an example of same in TS.  style is a very broad concept.  It seems to be intimating that I need a number OR string union?  Which makes no sense.


Type '{ visibility: string; }' is not assignable to type 'Properties<string | number, string & {}>'.

Type '{ visibility: string; }' is not assignable to type 'Properties<string | number, string & {}>'.
  Types of property 'visibility' are incompatible.
    Type 'string' is not assignable to type 'Visibility | undefined'.
    */