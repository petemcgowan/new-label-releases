import { useState, Fragment } from "react";
// eslint-disable-next-line
import React from 'react'

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import RegisterModal from "../modals/RegisterModal";
import PropTypes from "prop-types";
import LoginModal from "../modals/LoginModal";
// import Logout from "../components/auth/Logout";
// import svgLogo from "../images/vinyl-record-yellow-labelNoFont.svg";

import svgLogo2 from "../images/Vinyl_record.svg";

import { Switch, Route, Link } from "react-router-dom";
import { GlobalProvider } from "../contexts/GlobalContext";

import ReleaseContextProvider from "../contexts/ReleaseContext";

import { LabelsProvider } from "../contexts/LabelsContext";
import ReleaseList from "../components/ReleaseList";
import CrateList from "../components/CrateList";
import LabelList from "../components/LabelList";

import {
  RCContextProvider /*, state*/,
} from "../cratestate/RCContext";

import SearchReleaseForm from "./SearchReleasesForm";
import SearchLabelReleases from "./SearchLabelReleases";

import AddLabelForm from "./AddLabelForm";
import { useAppSelector } from "../components/auth/reduxHooks";
import Labels from "./Labels";
import ArtistReleases from "./ArtistReleases";
import LabelReleases from "./LabelReleases";


export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //Pete Todo Note:  Taking out CrateList, SearchLabelReleases and SearchReleaseForm.

  // const { isAuthenticated } = auth;

  const authReleaseLinks = (
    <Fragment>
        <GlobalProvider>
          <RCContextProvider>
            <ReleaseContextProvider>
              <LabelsProvider>
                <Switch>
                  <Route  path='/'>
                      <ArtistReleases />
                  </Route>
                  <Route path='/artistReleases'>
                      <ArtistReleases />
                  </Route>

                  <Route  path={`/labelReleases`}>
                  <LabelReleases/>

                  </Route>
                  <Route path="/labels">
                    {/* <AddLabelForm />
                    <LabelList /> */}
                    <Labels/>
                  </Route>
                </Switch>

              </LabelsProvider>
            </ReleaseContextProvider>
          </RCContextProvider>
        </GlobalProvider>
    </Fragment>
  );

  // const authMenuLinks = (
  //   <Fragment>
  //   <NavItem>
  //     Test
  //     </NavItem>
  //     <NavItem>
  //       <Logout />
  //     </NavItem>
  //   </Fragment>
  // );

  const authNEWMenuLinks = (
    <Fragment>
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/">New Releases</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              {/* <NavLink as={Link} to="/labels">Labels</NavLink> */}
                <Link to="/labels/">Labels</Link>
              </NavItem>
              <NavItem>
                <Link to="https://github.com/reactstrap/reactstrap">
                  GitHub
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Releases
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/artistReleases/">Artist Releases</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/labelReleases/">Label Releases</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

      {/* <UncontrolledDropdown inNavbar nav>
        <DropdownToggle caret nav>
          Releases
        </DropdownToggle>
        <DropdownMenu style={{backgroundColor:" rgba(138, 149, 143, 1)", color: "rgba(138, 149, 143, 1)"}}>
          <DropdownItem>
            <Fragment>
              <NavLink href="/artistReleases">Artist</NavLink>
            </Fragment>
          </DropdownItem>
          <DropdownItem>
            <NavLink to="/labelReleases">
              Label
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown inNavbar nav>
        <DropdownToggle caret nav>
          Settings
        </DropdownToggle>
        <DropdownMenu style={{backgroundColor:" rgba(59, 73, 55, 1)", color: "rgba(138, 149, 143, 1)"}}>
          <DropdownItem>
            <Fragment>
              {/* <NavLink to="/labels">
                Labels
              </NavLink> */}
              {/* <NavLink to="/labels">
                Labels
              </NavLink> */}
                {/* <Labels/> */}

            {/* </Fragment>
          </DropdownItem>
          <DropdownItem disabled>
            <Fragment>
              <NavLink >
                Artists
              </NavLink>
            </Fragment>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown> */}
      {/* <NavItem>
        <Logout />
      </NavItem> */}
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
              {auth!.isAuthenticated ? authNEWMenuLinks : guestLinks}
      <Container>        {auth!.isAuthenticated ? authReleaseLinks : null}
      </Container>
    </div>
  );
};


export default connect(null, null)(AppNavbar);
