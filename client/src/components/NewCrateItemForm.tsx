import React, { useContext, useState } from "react";
// import { RecordCrateContext } from "../contexts/RecordCrateContext";
import { RCContext } from "../cratestate/RCContext";
import "../styles/formElements.scss";
import { addAxiosRecord } from "../cratestate/RCActions";
import { IRecord } from "../cratestate/RCState";
import { getEmail } from "../utils/helpers";

const NewCrateItemForm = () => {
  // const { addRecordCrateNew } = useContext(RecordCrateContext);
  const { dispatchRC } = useContext(RCContext);
  const [artists, setArtists] = useState("");
  const [releaseName, setReleaseName] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const recordCrateItem: IRecord = {
      id: "dummy",
      artists: artists,
      releaseName: releaseName,
      trackName: "release.DUMMYtrackName",
      emailAddress: getEmail(),
    };

    addAxiosRecord(dispatchRC, recordCrateItem);
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
