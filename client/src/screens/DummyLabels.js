import React, { useEffect } from "react";

export const DummyLabels = () => {
  useEffect(() => {
    console.log("DummyLabels, useEffect");
  }, []);

  return <div>DummyLabels</div>;
};

export default DummyLabels;
