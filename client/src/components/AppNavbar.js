import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { connect, ConnectedProps, useSelector } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import svgLogo from "../images/vinyl-record-yellow-labelNoFont.svg";

import { GlobalProvider } from "../contexts/GlobalState";

import ReleaseContextProvider from "../contexts/ReleaseContext";
import { RecordCrateProvider } from "../contexts/RecordCrateState";
import { LabelsProvider } from "../contexts/LabelsState";
import ReleaseList from "./ReleaseList";
import CrateList from "./CrateList";
import LabelList from "./LabelList";
import Playbar from "./Playbar";

// import NewReleaseForm from './NewReleaseForm';
// import NewCrateItemForm from './NewCrateItemForm';
import SearchReleaseForm from "./SearchReleasesForm";
import SearchLabelReleases from "./SearchLabelReleases";

import AddLabelForm from "./AddLabelForm";
// import { useAudio } from "react-use";

// interface RootState {
//   isOpen: boolean
// }

// const mapState = (state: RootState) => ({
//   isOpen: state.isOpen,
// })

// const connector = connect(mapState, null)

// type PropsFromRedux = ConnectedProps<typeof connector>

export const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { isAuthenticated, user } = auth;
  // const [audio, state, controls, ref] = useAudio({
  //   src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  //   autoPlay: true,
  // });

  const authFilmLinks = (
    <Fragment>
      <GlobalProvider>
        <RecordCrateProvider>
          <ReleaseContextProvider>
            <LabelsProvider>
              {/* <NavbarNLR /> */}
              <AddLabelForm />
              <LabelList />
              <SearchLabelReleases />
              <ReleaseList />
              <SearchReleaseForm />
              {/* <NewReleaseForm /> */}
              <CrateList />
              <Playbar />

              {/* <NewCrateItemForm /> */}
            </LabelsProvider>
          </ReleaseContextProvider>
        </RecordCrateProvider>
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
              src={svgLogo}
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
