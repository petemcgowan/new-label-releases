import React, { Component } from "react";
import CrateList from "../components/CrateList";
import ReleaseListFlex from "../components/ReleaseListFlex";
import SearchLabelReleases from "./SearchLabelReleases";

export const LabelReleases = () => {
  return (
    <div>
      <SearchLabelReleases />
      <ReleaseListFlex />
      <CrateList />
    </div>
  );
};

export default LabelReleases;
