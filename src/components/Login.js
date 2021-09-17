import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router";

const Login = () => {
  const [user, setUser] = useState({
    credentials: {
      username: '',
      password: ''
    }
  })
  const [error, setError] = useState(false);
  const { push } = useHistory();

  const handleChange = e => {
    setUser({
      credentials: {
        ...user.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const login = e => {
    e.preventDefault();
    if (user.credentials.username === "" || user.credentials.password === "") {
      setError("Username or Password not valid.");
    } else {
      axios.post("http://localhost:5000/api/login", user.credentials)
        .then(resp => {
          setError("");
          localStorage.setItem("token", resp.data.payload);
          push('/bubble');
      })
      .catch(err => {
        console.log(err);
      })
    }
  };

  // const error = "";
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            id="username"
            value={user.credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={user.credentials.password}
            onChange={handleChange}
          />
          <button id="submit">Log in</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"