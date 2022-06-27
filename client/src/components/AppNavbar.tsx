import { useState, Fragment } from "react";
// eslint-disable-next-line
import React from 'react'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
// import svgLogo from "../images/vinyl-record-yellow-labelNoFont.svg";
import svgLogo2 from "../images/Vinyl_record.svg";

import { GlobalProvider } from "../contexts/GlobalContext";

import ReleaseContextProvider from "../contexts/ReleaseContext";

import { LabelsProvider } from "../contexts/LabelsContext";
import ReleaseList from "./ReleaseList";
import CrateList from "./CrateList";
import LabelList from "./LabelList";

import {
  RCContextProvider /*, state*/,
} from "../cratestate/RCContext";

import SearchReleaseForm from "./SearchReleasesForm";
import SearchLabelReleases from "./SearchLabelReleases";

import AddLabelForm from "./AddLabelForm";
import { useAppSelector } from "./auth/reduxHooks";


export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //Pete Todo Note:  Taking out CrateList, SearchLabelReleases and SearchReleaseForm.

  const { isAuthenticated, user } = auth;

  const authFilmLinks = (
    <Fragment>
      <GlobalProvider>
        <RCContextProvider>
          <ReleaseContextProvider>
            <LabelsProvider>
              {/* <NavbarNLR /> */}
              <AddLabelForm />
              <LabelList />
              <SearchLabelReleases />
              <ReleaseList />
              {/* <AudioPlayer tracks={tracks} /> */}
              <SearchReleaseForm />
              {/* <NewReleaseForm />  not currently in Github */}
              <CrateList />
              {/* <Playbar /> */}

              {/* <NewCrateItemForm /> */}
            </LabelsProvider>
          </ReleaseContextProvider>
        </RCContextProvider>
      </GlobalProvider>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          {user ? `Welcome ${user.name}` : ""}
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">
            <img
              src={svgLogo2}
              width="96"
              height="96"
              className="d-inline-block align-top"
              alt="New Label Releases logo"
            />
          </NavbarBrand>
          New Releases
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Container>
        {isAuthenticated ? authFilmLinks : "Login to view your releases!"}
      </Container>
    </div>
  );
};

export default connect(null, null)(AppNavbar);
