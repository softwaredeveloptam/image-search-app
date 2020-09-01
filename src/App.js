import React, { Fragment } from "react";

// React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import About from "./components/About";
import Favorites from "./features/favorites/Favorite";
import Home from "./components/Home";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./styles/App.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textColor: "black",
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className="App">
        <Fragment>
          <nav>
            <Paper className={classes.root}>
            <Tabs aria-label="simples tab example" indicatorColor="primary" textColor="primary" centered>
              <Tab label="Home" value="/" component={Link} to="/" textColor="primary"/>
              {/* <Link to="/">Home</Link> | */}
              <Tab
                label="Favorites"
                value="/favorites"
                component={Link}
                to="/favorites"
              />
              {/* <Link to="/favorites">Favorites</Link> |{" "} */}

              <Tab label="About" value="/about" component={Link} to="/about" />
              {/* <Link to="/about">About</Link> */}
            </Tabs>
            </Paper>
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
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
