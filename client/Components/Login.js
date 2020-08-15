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
  SvgIcon,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {toast} from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FacebookIcon from "@material-ui/icons/Facebook";
import {clearForm, login, updateForm} from "../store/actions";

toast.configure();

const useStyles = makeStyles({
  root: {
    backgroundColor: "white ",
    height: "100%",
    display: "flex",
    width: "100vw",
    flexDirection: "row",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "50vw",
    maxWidth: "50vw",
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
  activeOrders,
  products,
  user,
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
                      <a href="http://localhost:3000/api/auth/facebook">
                        <Button color="primary" size="large" variant="contained">
                          <FacebookIcon className={classes.socialIcon} />
                          Login with Facebook
                        </Button>
                      </a>
                    </Grid>
                    <Grid item>
                      <a href="http://localhost:3000/api/auth/google">
                        <Button size="large" variant="contained">
                          <SvgIcon>
                            <path d="M21,12.2177419 C21,13.9112905 20.6311475,15.4233869 19.8934426,16.7540323 C19.1557377,18.0846776 18.1168031,19.1249998 16.7766393,19.875 C15.4364756,20.6250002 13.8934424,21 12.147541,21 C10.4999998,21 8.97540984,20.5947579 7.57377049,19.7842742 C6.17213115,18.9737905 5.05942604,17.8790323 4.23565574,16.5 C3.41188543,15.1209677 3,13.6209679 3,12 C3,10.3790321 3.41188543,8.87903226 4.23565574,7.5 C5.05942604,6.12096774 6.17213115,5.02620949 7.57377049,4.21572581 C8.97540984,3.40524212 10.4999998,3 12.147541,3 C14.5327871,3 16.5737705,3.78629051 18.2704918,5.35887097 L15.7991803,7.71774194 C15.0122953,6.96774175 14.0655738,6.52016129 12.9590164,6.375 C11.9262295,6.22983871 10.9057375,6.375 9.89754098,6.81048387 C8.88934445,7.24596774 8.07786904,7.89919355 7.46311475,8.77016129 C6.79918033,9.71370968 6.46721311,10.7903228 6.46721311,12 C6.46721311,13.0403228 6.72540984,13.9899192 7.24180328,14.8487903 C7.75819672,15.7076615 8.4467215,16.3971776 9.30737705,16.9173387 C10.1680326,17.4374998 11.1147541,17.6975806 12.147541,17.6975806 C13.2540984,17.6975806 14.2254096,17.455645 15.0614754,16.9717742 C15.7254098,16.5846772 16.2786885,16.0645161 16.7213115,15.4112903 C17.0409838,14.8790321 17.2499998,14.3467744 17.3483607,13.8145161 L12.147541,13.8145161 L12.147541,10.6935484 L20.852459,10.6935484 C20.9508199,11.2258066 21,11.7338712 21,12.2177419 Z" />
                          </SvgIcon>
                          Login with Google
                        </Button>
                      </a>
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
                    onClick={(e) =>
                      logInUser(e, username, password, products, activeOrders)
                    }
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

const mapState = ({form, cart, orders, user}) => {
  const {username, password, loggedIn, visible} = form;
  const {products} = cart;
  const {activeOrders} = orders;
  return {
    username,
    password,
    loggedIn,
    products,
    visible,
    activeOrders,
  };
};

const mapDispatch = (dispatch) => {
  const setUsername = (e) => {
    dispatch(updateForm("username", e.target.value));
  };
  const setPassword = (e) => {
    dispatch(updateForm("password", e.target.value));
  };
  const logInUser = async (e, username, password, products, activeOrders) => {
    e.preventDefault();
    if (username.length && password.length) {
      const status = await dispatch(login({username, password}, products, activeOrders));
      if (status) {
        await dispatch(updateForm("loggedIn", true));
        toast(`${username} successfully logged in!`);
      } else toast("username or password is incorrect!");
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
