import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import "./styles.scss";
import axiosWithAuth from "./helpers/axiosWithAuth";

function App() {

  const logout = () => {
    axiosWithAuth().post('/logout')
      .then(resp => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <button data-testid="logoutButton" onClick={logout}>logout</button>
        </header>
        <Switch>
          <PrivateRoute path="/bubble" component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage It 