import React, { useContext, useState } from "react";
import { RecordCrateContext } from "../contexts/RecordCrateState";
import "../styles/formElements.scss";

const NewCrateItemForm = () => {
  const { addRecordCrate } = useContext(RecordCrateContext);
  const [artists, setArtists] = useState("");
  const [releaseName, setReleaseName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecordCrate({
      type: "ADD_RECORD_CRATE",
      crateItem: { artists, releaseName },
    });
    setArtists("");
    setReleaseName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="crate item artists"
        value={artists}
        onChange={(e) => setArtists(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="release name"
        value={releaseName}
        onChange={(e) => setReleaseName(e.target.value)}
        required
      />
      <input type="submit" value="add crate item" />
    </form>
  );
};

export default NewCrateItemForm;
