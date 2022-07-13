import { useState, useEffect, Fragment } from "react";
import logo from "./images/vinyl2.png";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Labels } from "./screens/Labels";
import { DummyLabels } from "./screens/DummyLabels";
import ArtistReleases from "./screens/ArtistReleases";
import DummyArtistReleases from "./screens/DummyArtistReleases";
import LabelReleases from "./screens/LabelReleases";
import DummyLabelReleases from "./screens/DummyLabelReleases";
import { loadUser } from "./actions/authActions";
import { Provider } from "react-redux";
import reduxAuthStore from "./reduxAuthStore";

import { GlobalProvider } from "./contexts/GlobalContext";
import ReleaseContextProvider from "./contexts/ReleaseContext";
import { LabelsProvider } from "./contexts/LabelsContext";
import { RCContextProvider /*, state*/ } from "./cratestate/RCContext";

import {
  UncontrolledDropdown,
  DropdownToggle,
  Dropdown,
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
// import "./styles/main.scss";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("Main App, useEffect called");
    const fetchUser = async () => {
      await reduxAuthStore.dispatch(loadUser());
    };
    fetchUser();
  }, []);

  return (
    <Provider store={reduxAuthStore}>
      <div>
        <div>
          <Navbar color="dark" light expand="md">
            <NavbarBrand href="/" style={{ color: "white" }}>
              New Releases
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/labels" style={{ color: "white" }}>
                    Labels
                  </Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Releases
                  </DropdownToggle>
                  <DropdownMenu
                    right
                    style={{
                      backgroundColor: "rgba(59, 73, 55, 1)",
                      color: "white",
                    }}
                  >
                    <DropdownItem>
                      <Link to="/artistReleases" style={{ color: "white" }}>
                        Artist Releases
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/labelReleases" style={{ color: "white" }}>
                        Label Releases
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <GlobalProvider>
          <RCContextProvider>
            <ReleaseContextProvider>
              <LabelsProvider>
                <Switch>
                  <Route exact path="/">
                    <ArtistReleases />
                  </Route>
                  <Route exact path="/artistReleases">
                    <ArtistReleases />
                  </Route>

                  <Route path="/labelReleases">
                    <LabelReleases />
                  </Route>
                  <Route path="/labels">
                    <Labels />
                  </Route>
                </Switch>
              </LabelsProvider>
            </ReleaseContextProvider>
          </RCContextProvider>
        </GlobalProvider>
      </div>
    </Provider>
  );
}

export default App;
