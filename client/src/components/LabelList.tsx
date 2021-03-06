import { useContext, useEffect } from "react";
// eslint-disable-next-line
import React from "react";
import { LabelsContext } from "../contexts/LabelsContext";
import LabelsDetails from "./LabelsDetails";
import "../styles/uiElements.scss";

const LabelsList = () => {
  const { state, searchLabels } = useContext(LabelsContext);

  useEffect(() => {
    console.log("LabelList, useEffect called");
    const fetchLabels = async () => {
      const labelData = await searchLabels(searchLabels); // TS wants a dispatch as arg.  Ok then!
      console.log("LabelsContext:" + labelData);
      // if (!labelData) labelData = [];
      // return labelData ? labelData : [];
    };
    fetchLabels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state.labels && state.labels.length ? (
    <div
      className="crate-list"
      style={{
        display: "flex",
        // alignItems: "stretch",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <table>
        <thead>
          <tr>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {state.labels.map((label) => {
            return <LabelsDetails label={label} key={label.id} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="empty">No labels entered yet</div>
  );
};

export default LabelsList;
