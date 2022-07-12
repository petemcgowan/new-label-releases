import React, { Component, useEffect } from "react";
import CrateList from "../components/CrateList";
import ReleaseList from "../components/ReleaseList";
import ReleaseListFlex from "../components/ReleaseListFlex";
import SearchReleaseForm from "./SearchReleasesForm";

export const ArtistReleases = () => {
  useEffect(() => {
    console.log("ArtistReleases, useEffect");
  }, []);

  return (
    <div>
      <SearchReleaseForm />
      <div>
        <ReleaseListFlex />
        <CrateList />
      </div>
    </div>
  );
};

export default ArtistReleases;
