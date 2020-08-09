import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link, useHistory, Redirect} from "react-router-dom";
import {
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
  Input,
  InputLabel,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {toast} from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";

import {clearForm, login, updateForm} from "../store/actions";

toast.configure();

const useStyles = makeStyles({
  root: {
    backgroundColor: "white ",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "50%",
  },
  quote: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url(https://kecbio.com/wallpaper/cool-gaming-wallpapers-full-hd-For-Full-Resolution-Wallpaper.jpg)",
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
    fontWeight: 300,
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
    marginRight: "10px",
    marginLeft: "20px",
  },
  title: {
    padding: "15px",
    marginBottom: "20px",
  },
  socialIcon: {
    padding: "10px",
  },
  sugestion: {
    marginTop: "10px",
    padding: "15px",
  },
  textField: {
    padding: "10px",
    marginLeft: "0",
  },
  signInButton: {
    padding: "15px",
    marginBottom: "20px",
    marginTop: "15px",
  },
});

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
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      {loggedIn ? (
        <div>
          <Redirect to="/home" />
        </div>
      ) : (
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h2">
                  It’s dangerous to go alone, take this!
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Old Man
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    The Legend of Zelda
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton onClick={() => history.goBack()}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Sign in with social media
                  </Typography>
                  <Grid className={classes.socialButtons} container spacing={2}>
                    <Grid item>
                      <Button color="primary" size="large" variant="contained">
                        <FacebookIcon className={classes.socialIcon} />
                        Login with Facebook
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button size="large" variant="contained">
                        <GitHubIcon className={classes.socialIcon} />
                        Login with GitHub
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography
                    align="center"
                    className={classes.sugestion}
                    color="textSecondary"
                    variant="body1"
                  >
                    Login With Email
                  </Typography>
                  <InputLabel>Email</InputLabel>
                  <Input
                    className={classes.textField}
                    fullWidth
                    label="Email address"
                    name="email"
                    onChange={setUsername}
                    type="text"
                    value={username}
                    inputProps={{style: {textAlign: "center"}}}
                  />
                  <InputLabel>Password</InputLabel>
                  <Input
                    className={classes.textField}
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={setPassword}
                    value={password}
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
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={(e) => logInUser(e, username, password)}
                  >
                    Sign in now
                  </Button>
                  <Typography color="textSecondary" variant="body1">
                    Don't have an account?{" "}
                    <Link to="/register" variant="h6">
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapState = ({form, cart}) => {
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
