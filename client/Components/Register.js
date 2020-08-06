import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {TextField, FormControl, Button} from "@material-ui/core";
import axios from "axios";

import {clearForm, updateForm} from "../store/actions";

const Register = ({
  username,
  password,
  loggedIn,
  setUsername,
  setPassword,
  createUser,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearForm());
  }, []);
  return (
    <div>
      {loggedIn ? (
        <div>
          <Redirect to="/" />
        </div>
      ) : (
        <div className="form">
          <FormControl>
            <TextField
              value={username}
              label="Username"
              onChange={setUsername}
              inputProps={{style: {textAlign: "center"}}}
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              value={password}
              label="Password"
              onChange={setPassword}
              inputProps={{style: {textAlign: "center"}}}
            />
          </FormControl>
          <br />
          <Button onClick={(e) => createUser(e, username, password)}>
            Create New User
          </Button>
        </div>
      )}
    </div>
  );
};

const mapState = ({form}) => {
  const {username, password, loggedIn} = form;
  return {
    username,
    password,
    loggedIn,
  };
};

const mapDispatch = (dispatch) => {
  const setUsername = (e) => {
    dispatch(updateForm("username", e.target.value));
  };
  const setPassword = (e) => {
    dispatch(updateForm("password", e.target.value));
  };
  const createUser = (e, username, password) => {
    if (username.length && password.length) {
      axios
        .post("/api/auth/register", {username, password})
        .then((res) => {
          dispatch(clearForm());
        })
        .catch((err) => console.error(err));
    }
  };
  return {
    setUsername,
    setPassword,
    createUser,
    dispatch,
  };
};
export default connect(mapState, mapDispatch)(Register);
