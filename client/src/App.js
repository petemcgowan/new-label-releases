import React, { useEffect } from "react";

import AppNavbar from "./components/AppNavbar";
import { Provider } from "react-redux";
import reduxAuthStore from "./reduxAuthStore";
import { loadUser } from "./actions/authActions";

import { GlobalProvider } from "./contexts/GlobalState";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/main.scss";

function App() {
  useEffect(() => {
    console.log("Main App, useEffect called");
    const fetchUser = async () => {
      await reduxAuthStore.dispatch(loadUser());
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={reduxAuthStore}>
      <AppNavbar />

      <GlobalProvider>
        <div className="container"></div>
      </GlobalProvider>
    </Provider>
  );
}

export default App;
