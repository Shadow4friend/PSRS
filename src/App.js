import "./styles.css";
import React from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { BodyContainer } from "./components/BodyContainer/BodyContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div>
        <div className="Container-main">
          <div className="header-container-sdax5f">
            <Header />
          </div>
          <div className="main">
            <div>
              <Sidebar />
            </div>

            <main>
              <BodyContainer />
            </main>
          </div>
        </div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
