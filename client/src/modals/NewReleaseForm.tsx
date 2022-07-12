import React, { useContext, useState } from "react";
import { ReleaseContext } from "../contexts/ReleaseContext";
import "../styles/formElements.scss";

const NewReleaseForm = () => {
  // 'dispatch' here means addRelease (now in the reducer)
  const { dispatch } = useContext(ReleaseContext);
  const [artists, setArtists] = useState("");
  const [releaseName, setReleaseName] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch({
      type: "ADD_DUMMY_RELEASE",
      release: { artists, releaseName },
    });
    setArtists("");
    setReleaseName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="artists"
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
      <input type="submit" value="add release" style={{ backgroundColor:"rgba(138, 149, 143, 1)", color: "rgba(255, 255, 255, 1)" }} />
    </form>
  );
};

export default NewReleaseForm;
