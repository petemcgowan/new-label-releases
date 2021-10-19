import React, { useContext, useState } from "react";
import { ReleaseContext } from "../contexts/ReleaseContext";

import { RecordCrateContext } from "../contexts/RecordCrateState";

import { getEmail } from "../utils/helpers";
import "../styles/uiElements.scss";
import "../styles/homepage.scss";
import PlayPause from "./PlayPause";

const nullw500 = require("../images/nullw500.png");

const ReleaseDetails = ({ release }) => {
  const { state, dispatch } = useContext(ReleaseContext);
  const { addRecordCrate } = useContext(RecordCrateContext);
  const [playVisibleId, setPlayVisibleId] = useState(false);

  // className="movie-item" -< not sure if this style is needed
  return (
    <tr key={release.id}>
      <td
        onMouseEnter={() => {
          setPlayVisibleId(release.id);
          console.log("SPV:Enter:release.id" + release.id);
        }}
        onMouseLeave={() => {
          setPlayVisibleId("");
        }}
        style={{ width: 75, paddingLeft: 5 }}
      >
        <PlayPause
          playing={state.playing}
          songId={release.id}
          isCurrentSong={state.currentSongId === release.id}
          visible={playVisibleId === release.id}
        />

        <span style={{ marginRight: 10 }} />
        <span style={{ marginRight: 10 }} />
      </td>
      <td>
        <img
          src={release.releaseImage ? `${release.releaseImage}` : `${nullw500}`}
          alt={`Album Cover`}
        />
      </td>
      <td className="artists">{release.artists}</td>

      <td className="releaseName">{release.trackName}</td>
      <td>
        <button
          onClick={() => {
            console.log(
              "Adding crate item, release.releaseName:" +
                release.releaseName +
                ", release.trackName:" +
                release.trackName
            );
            dispatch({ type: "REMOVE_RELEASE", release });
            addRecordCrate(
              release.artists,
              release.releaseName,
              release.trackName,
              getEmail()
            );
          }}
        >
          Add to Cart
        </button>
      </td>
    </tr>
  );
};

export default ReleaseDetails;
