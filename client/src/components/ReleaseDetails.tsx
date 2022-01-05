import React, { useContext, useState } from "react";
import { ReleaseContext } from "../contexts/ReleaseContext";

import { RCContext } from "../cratestate/RCContext";
import { getEmail } from "../utils/helpers";
import "../styles/uiElements.scss";
import "../styles/homepage.scss";
import PlayPause from "./PlayPause";
import { addAxiosRecord } from "../cratestate/RCActions";
import { IReleaseTrack } from "../types/interfaces";

const nullw500 = require("../images/nullw500.png");

interface ReleaseRowProps {
  release: IReleaseTrack,
  trackIndex: number
}


const ReleaseDetails = ({ release, trackIndex }: ReleaseRowProps) => {
  const { state, dispatch } = useContext(ReleaseContext);
  // const { addRecordCrateNew } = useContext(RecordCrateContext);
  const { dispatchRC } = useContext(RCContext);
  // const [playVisibleId, setPlayVisibleId] = useState(false);
  const [playVisibleId, setPlayVisibleId] = useState("");

  // className="movie-item" -< not sure if this style is needed
  return (
    <tr key={release.id}>
      <td
        onMouseEnter={() => {
          setPlayVisibleId(release.id);
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
          trackIndex={trackIndex}
        />

        <span style={{ marginRight: 10 }} />
        <span style={{ marginRight: 10 }} />
      </td>
      <td>
        <img
          src={release.releaseSmallImage ? `${release.releaseSmallImage}` : `${nullw500}`}
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

            // : IRecord
            let recordCrateItem = {
              // this will be ignored when serializing as we don't know RC ID here
              id: release.id,
              artists: release.artists,
              releaseName: release.releaseName,
              trackName: release.trackName,
              emailAddress: getEmail(),
            };

            addAxiosRecord(dispatchRC, recordCrateItem);
            // addRecordCrateNew(recordCrateItem);
          }}
        >
          Add to Cart
        </button>
      </td>
    </tr>
  );
};

export default ReleaseDetails;
