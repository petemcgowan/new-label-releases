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
// import PropTypes from "prop-types";
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

// import NewReleaseForm from './NewReleaseForm';
// import NewCrateItemForm from './NewCrateItemForm';
import SearchReleaseForm from "./SearchReleasesForm";
import SearchLabelReleases from "./SearchLabelReleases";

import AddLabelForm from "./AddLabelForm";
import { useAppSelector } from "./auth/reduxHooks";
// import { useAudio } from "react-use";



// interface RootState {
//   isOpen: boolean
// }

// const mapState = (state: RootState) => ({
//   isOpen: state.isOpen,
// })

// const connector = connect(mapState, null)

// type PropsFromRedux = ConnectedProps<typeof connector>

export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  // const [state, dispatchRC] = useReducer(rcReducer, initialRCState);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //Pete Todo Note:  Taking out CrateList, SearchLabelReleases and SearchReleaseForm.

  const { isAuthenticated, user } = auth;
  // const [audio, state, controls, ref] = useAudio({
  //   src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  //   autoPlay: true,
  // });

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
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
      <div className="container"></div>
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
      {/* <div>
        {audio}
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <button onClick={controls.pause}>Pause</button>
        <button onClick={controls.play}>Play</button>
        <br />
        <button onClick={controls.mute}>Mute</button>
        <button onClick={controls.unmute}>Un-mute</button>
        <br />
        <button onClick={() => controls.volume(0.1)}>Volume: 10%</button>
        <button onClick={() => controls.volume(0.5)}>Volume: 50%</button>
        <button onClick={() => controls.volume(1)}>Volume: 100%</button>
        <br />
        <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
        <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button>
      </div> */}
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">
            <img
              src={svgLogo2}
              width="128"
              height="42"
              className="d-inline-block align-top"
              alt="New Label Releases logo"
            />
          </NavbarBrand>
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

// const mapStateToProps = (state /*: Types.RootState*/) => ({
//   auth: state.auth,
// });

// AppNavbar.propTypes = {
//   auth: PropTypes.object.isRequired,
// };

export default connect(null, null)(AppNavbar);
