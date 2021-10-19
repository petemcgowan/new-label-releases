import React, { useContext } from "react";
import { LabelsContext } from "../contexts/LabelsState";
import LabelsDetails from "./LabelsDetails";
import "../styles/uiElements.scss";

const LabelsList = () => {
  const { labels } = useContext(LabelsContext);
  return labels && labels.length ? (
    <div className="crate-list">
      <table>
        <thead>
          <tr>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label) => {
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
