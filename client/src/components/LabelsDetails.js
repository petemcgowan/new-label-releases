import React, { useContext } from "react";
import { LabelsContext } from "../contexts/LabelsState";
import "../styles/uiElements.scss";

const LabelsDetails = ({ label }) => {
  const { deleteLabel } = useContext(LabelsContext);
  return (
    <tr>
      <td
        onClick={() => {
          deleteLabel(label.id);
        }}
      >
        <div className="labelName">{label.labelName}</div>
      </td>
    </tr>
  );
};

export default LabelsDetails;
