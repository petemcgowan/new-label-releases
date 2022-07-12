import React, { useEffect } from "react";

export const DummyArtistReleases = () => {
  useEffect(() => {
    console.log("DummyArtistReleases, useEffect");
  }, []);

  return <div>DummyArtistReleases</div>;
};

export default DummyArtistReleases;
