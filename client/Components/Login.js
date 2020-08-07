import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {
  TextField,
  FormControl,
  Button,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
} from "@material-ui/core";
import {toast} from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";

import {clearForm, login, updateForm} from "../store/actions";

toast.configure();

const Login = ({
  username,
  password,
  loggedIn,
  setUsername,
  setPassword,
  logInUser,
  visible,
  dispatch,
  seePassword,
}) => {
  useEffect(() => {
    dispatch(clearForm());
  }, []);
  return (
    <div>
      {loggedIn ? (
        <Redirect to="/" />
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
            <InputLabel>Password</InputLabel>
            <Input
              value={password}
              label="Password"
              onChange={setPassword}
              type={visible ? "text" : "password"}
              inputProps={{style: {textAlign: "center"}}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => seePassword(e, visible)}
                  >
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <Button variant="outlined" onClick={(e) => logInUser(e, username, password)}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

const mapState = ({form, order, cart}) => {
  const {username, password, loggedIn, visible} = form;
  const {products} = cart;
  return {
    username,
    password,
    loggedIn,
    products,
    visible,
  };
};

const mapDispatch = (dispatch) => {
  const setUsername = (e) => {
    dispatch(updateForm("username", e.target.value));
  };
  const setPassword = (e) => {
    dispatch(updateForm("password", e.target.value));
  };
  const logInUser = (e, username, password) => {
    e.preventDefault();
    if (username.length && password.length) {
      console.log(username, password);
      dispatch(login({username, password}));
      dispatch(updateForm("loggedIn", true));
    } else toast("All Fields Must Be Completed");
  };
  const seePassword = (e, visible) => {
    e.preventDefault();
    dispatch(updateForm("visible", !visible));
  };
  return {
    setUsername,
    setPassword,
    logInUser,
    seePassword,
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(Login);
