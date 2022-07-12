import { useContext, useState } from "react";
// eslint-disable-next-line
import React from "react";

import { LabelsContext } from "../contexts/LabelsContext";
import "../styles/formElements.scss";

const AddLabelForm = () => {
  const { addLabel } = useContext(LabelsContext);
  const [labelValue, setLabelValue] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("AddLabelForm, labelValue:" + labelValue);
    e.preventDefault();
    addLabel(labelValue);
    setLabelValue("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "black" }}>
      <label
        style={{
          color: " rgba(138, 149, 143, 1)",
          width: "100%",
        }}
      >
        Label to add:
        <input
          type="text"
          placeholder="label to add"
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
          required
          style={{
            width: "100%",
          }}
        />
      </label>
      <input
        type="submit"
        value="Add Label"
        style={{
          backgroundColor: "rgba(138, 149, 143, 1)",
          color: "rgba(255, 255, 255, 1)",
          width: "100%",
        }}
      />
    </form>
  );
};

export default AddLabelForm;
