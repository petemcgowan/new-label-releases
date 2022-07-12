import React, { useEffect } from "react";
export const DummyLabelReleases = () => {
  useEffect(() => {
    console.log("DummyLabelReleases, useEffect");
  }, []);

  return <div>DummyLabelsReleases</div>;
};

export default DummyLabelReleases;
