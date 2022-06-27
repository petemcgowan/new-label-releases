import { useContext } from "react";
// eslint-disable-next-line
import React from 'react'

import { IRecord} from "../cratestate/RCState";
import { RCContext } from "../cratestate/RCContext";
import "../styles/uiElements.scss";
import { deleteAxiosRecord } from "../cratestate/RCActions";

interface CrateRowProps {
  crateItem: IRecord
}

const CrateDetails = ({ crateItem}: CrateRowProps ) => {
  // const { deleteRecordCrate } = useContext(RecordCrateContext);
  const { dispatchRC } = useContext(RCContext);
  return (
    <tr key={crateItem.id.toString()}>
      <td
        onClick={() => {
          // deleteRecordCrate(crateItem.id);
          deleteAxiosRecord(dispatchRC, crateItem.id);
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
