// import { Fragment } from "react";
// eslint-disable-next-line
import React, {useEffect} from 'react'
// import { NavLink } from "reactstrap";
import AddLabelForm from "./AddLabelForm";
import LabelList from "../components/LabelList";



export const Labels = () => {

  useEffect(() => {
    console.log ("Labels, useEffect");

  }, [])

  return (
    <div>
      <AddLabelForm />
      <LabelList />
    </div>
  );
};


export default Labels;
