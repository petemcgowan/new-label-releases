import React, { useContext } from "react";
import { RecordCrateContext } from "../contexts/RecordCrateState";
import "../styles/uiElements.scss";

const CrateDetails = ({ crateItem }) => {
  const { deleteRecordCrate } = useContext(RecordCrateContext);
  return (
    <tr>
      <td
        onClick={() => {
          deleteRecordCrate(crateItem.id);
        }}
      >
        <div className="releaseName">{crateItem.trackName}</div>
        <div className="artists">{crateItem.releaseName}</div>
        <div className="artists">{crateItem.artists}</div>
      </td>
    </tr>
  );
};

export default CrateDetails;
