import React, {useContext} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import AdminPage from "./views/AdminPage/AdminPage";

import GenresPage from "./views/GenresPage/GenresPage";
import HomePage from "./views/HomePage/HomePage";
import LoginPage from "./views/LoginPage/LoginPage";
import MoviesPage from "./views/MoviesPage/MoviesPage";

const APP_CONFIG = {
  headerName: "JY NoteBook",
};

const App = () => {

  return (
    <Router>
      <MainNavigation config={APP_CONFIG} />
      <main>
        <Switch>
          {/* <Route exact path="/" render={(props) => <Home {...props} title={`hello`}/>} /> */}
          <Route exact path="/">
            <HomePage title={`Home`} />
          </Route>
          <Route exact path="/genres">
            <GenresPage title={`Genres`} />
          </Route>
          <Route exact path="/movies">
            <MoviesPage title={`Movies`} />
          </Route>
          <Route exact path="/admin">
            <AdminPage title={`Admin`} />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
