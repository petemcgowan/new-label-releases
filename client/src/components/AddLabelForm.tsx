import React, { useContext, useState } from "react";
import { LabelsContext } from "../contexts/LabelsContext";
import "../styles/formElements.scss";

const AddLabelForm = () => {
  const { addLabel } = useContext(LabelsContext);
  const [labelValue, setLabelValue] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    console.log("AddLabelForm, labelValue:" + labelValue);
    e.preventDefault();
    addLabel(labelValue);
    setLabelValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Label to add:
        <input
          type="text"
          placeholder="label to add"
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
          required
        />
      </label>
      <input type="submit" value="Add Label" />
    </form>
  );
};

export default AddLabelForm;
