import { useContext, useState } from "react";
// eslint-disable-next-line
import React from "react";
import "./flexTable.scss";

import { ReleaseContext } from "../contexts/ReleaseContext";

import { RCContext } from "../cratestate/RCContext";
import { getEmail } from "../utils/helpers";
import "../styles/uiElements.scss";
import "../styles/homepage.scss";
import PlayPause from "./PlayPause";
import { addAxiosRecord } from "../cratestate/RCActions";
import { IReleaseTrack } from "../types/interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const nullw500 = require("../images/nullw500.png");

interface ReleaseRowProps {
  release: IReleaseTrack;
  trackIndex: number;
}

const ReleaseDetailsFlex = ({ release, trackIndex }: ReleaseRowProps) => {
  const { state, dispatch } = useContext(ReleaseContext);
  // const { addRecordCrateNew } = useContext(RecordCrateContext);
  const { dispatchRC } = useContext(RCContext);
  // const [playVisibleId, setPlayVisibleId] = useState(false);
  const [playVisibleId, setPlayVisibleId] = useState("");

  // className="movie-item" -< not sure if this style is needed
  return (
    <div>
      <div
        className="flex-table row"
        role="rowgroup"
        onMouseEnter={() => {
          setPlayVisibleId(release.id);
        }}
        onMouseLeave={() => {
          setPlayVisibleId("");
        }}
      >
        <div className="flex-row first" role="cell">
          {" "}
          <PlayPause
            playing={state.playing}
            songId={release.id}
            isCurrentSong={state.currentSongId === release.id}
            visible={playVisibleId === release.id}
            trackIndex={trackIndex}
          />
        </div>
        <div className="flex-row" role="cell">
          <img
            src={
              release.releaseSmallImage
                ? `${release.releaseSmallImage}`
                : `${nullw500}`
            }
            alt={`Album Cover`}
          />
        </div>
        <div className="flex-row" role="cell">
          {release.artists}
        </div>
        <div className="flex-row" role="cell">
          {release.trackName}
        </div>
        <div className="flex-row" role="cell">
          <button
            style={{ backgroundColor: "black" }}
            onClick={() => {
              console.log(
                "Adding crate item, release.releaseName:" +
                  release.releaseName +
                  ", release.trackName:" +
                  release.trackName
              );
              dispatch({ type: "REMOVE_RELEASE", release });

              // : IRecord
              const recordCrateItem = {
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
            <FontAwesomeIcon style={{ fontSize: "24px" }} icon={faCartPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseDetailsFlex;
