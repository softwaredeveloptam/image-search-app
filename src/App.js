import React from "react";

// React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import About from "./components/About";
import Favorites from "./features/favorites/Favorite";
import Home from "./components/Home";

// Styles
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;