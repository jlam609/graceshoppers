import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect, Link, useHistory} from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Input,
  IconButton,
  InputAdornment,
  Checkbox,
  InputLabel,
  TextField,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {clearForm, updateForm} from "../store/actions";

toast.configure();

const useStyles = makeStyles({
  root: {
    backgroundColor: "white ",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
    overflowY: "scroll",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100",
    minWidth: "50vw",
    maxWidth: "50vw",
  },
  quote: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url(https://i.pinimg.com/originals/63/43/68/6343686d5ae1eb0f852f3d088b8eda9c.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: "white",
    fontWeight: 100,
    marginBottom: 40,
  },
  name: {
    color: "white",
    marginBottom: 40,
  },
  bio: {
    color: "white",
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexGrow: "1",
    flexBasis: "0%",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  form: {
    marginLeft: 30,
    marginRight: 10,
  },
  title: {
    marginBottom: 30,
  },
  phrase: {
    marginBottom: 50,
  },
  textField: {
    marginTop: 15,
    marginBottom: 15,
  },
  policy: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
    marginTop: 15,
    marginBottom: 15,
  },
  signUpButton: {
    marginTop: 15,
    marginBottom: 30,
  },
});

const RegisterAdmin = ({
  username,
  password,
  loggedIn,
  setData,
  dispatch,
  user,
  visible,
  seePassword,
  policy,
  setPolicy,
  createAdmin,
  firstName,
  lastName,
  imageUrl,
}) => {
  useEffect(() => {
    dispatch(clearForm());
  }, []);
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loggedIn && user.clearance < 5 ? (
        <div>
          <Redirect to="/" />
        </div>
      ) : (
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h2">
                  Finish him!
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Mortal Kombat announcer,
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Mortal Kombat
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton onClick={(e) => history.goBack()}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    className={classes.phrase}
                  >
                    Use your email to create new account
                  </Typography>
                  <InputLabel>Email</InputLabel>
                  <Input
                    className={classes.textField}
                    fullWidth
                    label="Email address"
                    name="email"
                    onChange={(e) => setData(e, "username")}
                    type="text"
                    value={username}
                    inputProps={{style: {textAlign: "center"}}}
                    variant="outlined"
                  />
                  <InputLabel>Password</InputLabel>
                  <Input
                    className={classes.textField}
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={(e) => setData(e, "username")}
                    value={password}
                    variant="outlined"
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
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="First Name"
                    name="First Name"
                    onChange={(e) => setData(e, "firstName")}
                    type="text"
                    value={firstName}
                    inputProps={{style: {textAlign: "center"}}}
                  />
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="Last Name"
                    name="Last Name"
                    onChange={(e) => setData(e, "lastName")}
                    type="text"
                    value={lastName}
                    inputProps={{style: {textAlign: "center"}}}
                  />
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="imageUrl"
                    name="imageUrl"
                    onChange={(e) => setData(e, "imageUrl")}
                    type="text"
                    value={imageUrl}
                    inputProps={{style: {textAlign: "center"}}}
                  />
                  <div className={classes.policy}>
                    <Checkbox
                      checked={policy}
                      className={classes.policyCheckbox}
                      color="primary"
                      name="policy"
                      onChange={(e) => setPolicy(e, policy)}
                    />
                    <Typography
                      className={classes.policyText}
                      color="textSecondary"
                      variant="body1"
                    >
                      I have read the Terms and Conditions
                    </Typography>
                  </div>
                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={!policy}
                    onClick={(e) => createAdmin(e, username, password, history)}
                  >
                    Create as Admin
                  </Button>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapState = ({form, user}) => {
  const {
    username,
    password,
    loggedIn,
    visible,
    policy,
    firstName,
    lastName,
    imageUrl,
  } = form;
  return {
    username,
    password,
    loggedIn,
    user,
    visible,
    policy,
    firstName,
    lastName,
    imageUrl,
  };
};

const mapDispatch = (dispatch) => {
  const setData = (e, name) => {
    dispatch(updateForm(name, e.target.value));
  };
  const createAdmin = (e, username, password, history) => {
    e.preventDefault();
    if (username.length && password.length) {
      axios
        .post("/api/admin/register", {username, password})
        .then((res) => {
          dispatch(clearForm());
          toast(res.data.message);
          history.push("/home");
        })
        .catch((err) => toast(`Admin was not created`));
    }
  };
  const seePassword = (e, visible) => {
    e.preventDefault();
    dispatch(updateForm("visible", !visible));
  };
  const setPolicy = (e, policy) => {
    e.preventDefault();
    dispatch(updateForm("policy", !policy));
  };
  return {
    setData,
    createAdmin,
    dispatch,
    seePassword,
    setPolicy,
  };
};
export default connect(mapState, mapDispatch)(RegisterAdmin);
