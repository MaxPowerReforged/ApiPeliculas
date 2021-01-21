import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MovieCreate from "./components/movie-create.component";
import MovieList from "./components/movie-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/movies" className="navbar-brand">
            <img src={require("./images/MaxReact.jpg")} alt="logo"/>
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/movies"} className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/movies"]} component={MovieList} />
            <Route exact path="/add" component={MovieCreate} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;