import React, { useContext, useEffect} from "react";
import CrateDetails from "./CrateDetails";
import { RCContext } from "../cratestate/RCContext";
import "../styles/uiElements.scss";
import { searchAxiosRecord } from "../cratestate/RCActions";

const CrateList = () => {
  const { stateRC, dispatchRC } = useContext(RCContext);

  useEffect(() => {
    console.log("CrateList, useEffect called");
    const fetchRC = async () => {
      const crateData = await searchAxiosRecord(dispatchRC);
      console.log("CrateList, crateData" + JSON.stringify(crateData));
    };
    fetchRC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return stateRC.recordCrate && stateRC.recordCrate.length ? (
    <div className="crate-list">
      <table>
        <thead>
          <tr key="headtheball">
            <th>Release</th>
          </tr>
        </thead>
        <tbody>
          {stateRC.recordCrate.map((crateItem) => {
            console.log(
              "CrateList, recordCrate:" + JSON.stringify(stateRC.recordCrate)
            );
            console.log(
              "CrateList, recordCrate.length:" +
                JSON.stringify(stateRC.recordCrate.length)
            );
            console.log("CrateList, crateItem:" + JSON.stringify(crateItem));
            return (
              <CrateDetails
                crateItem={crateItem}
                key={crateItem.id.toString()}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="empty">No crate Items to ogle over.</div>
  );
};

export default CrateList;
