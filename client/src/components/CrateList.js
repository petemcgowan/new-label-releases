import React, { useContext } from "react";
import CrateDetails from "./CrateDetails";
import { RecordCrateContext } from "../contexts/RecordCrateState";
import "../styles/uiElements.scss";

const CrateList = () => {
  const { recordCrate } = useContext(RecordCrateContext);
  return recordCrate && recordCrate.length ? (
    <div className="crate-list">
      <table>
        <thead>
          <tr>
            <th>Release</th>
          </tr>
        </thead>
        <tbody>
          {recordCrate.map((crateItem) => {
            console.log(
              "CrateList, recordCrate:" + JSON.stringify(recordCrate)
            );
            console.log(
              "CrateList, recordCrate.length:" +
                JSON.stringify(recordCrate.length)
            );
            console.log("CrateList, crateItem:" + JSON.stringify(crateItem));
            return <CrateDetails crateItem={crateItem} key={crateItem.id} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="empty">No crate Items to ogle over.</div>
  );
};

export default CrateList;
