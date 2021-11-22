import React, { useContext } from "react";
import { LabelsContext } from "../contexts/LabelsContext";
import { ILabel } from "../reducers/LabelsReducer";
import "../styles/uiElements.scss";

interface LabelRowProps {
  label: ILabel
}


const LabelsDetails = ({ label }: LabelRowProps) => {
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
