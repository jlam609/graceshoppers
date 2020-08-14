import React from "react";
import {Link, Redirect} from "react-router-dom";
import {IconButton, Menu, MenuList, MenuItem, Button} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import CreateIcon from "@material-ui/icons/Create";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {connect} from "react-redux";
import Axios from "axios";
import Icon from "@material-ui/core/Icon";

import {
  clearForm,
  updateInput,
  clearInput,
  fetchSessionOrder,
  clearUser,
  logout,
} from "../store/actions";

const Nav = ({loggedIn, toggle, toggleMenu, logoutUser, handleClose, products, user}) => {
  return (
    <div className="nav">
      <img
        src="https://i.ibb.co/HY7x7f2/Tacks-Sign.png"
        alt="Tacks-Sign"
        border="0"
        className="logo"
      />
      <div className="navBag">
        <Link to="/weapons">
          <div className="navBook">
            <img className="icon" src="https://i.ibb.co/LJtG9Tp/Asset-5.png" />
            <span>Weapons</span>
          </div>
        </Link>
        <Link to="/armors">
          <div className="navBook">
            <img className="icon" src="https://i.ibb.co/rxpTWhX/Asset-7.png" />
            <span>Armor</span>
          </div>
        </Link>
        <Link to="/magic">
          <div className="navBook">
            <img className="icon" src="https://i.ibb.co/DWLXBFD/Asset-8.png" />
            <span>Spells</span>
          </div>
        </Link>
        <Link to="/items">
          <div className="navBook">
            <img className="icon" src="https://i.ibb.co/rZM9747/Asset-9.png" />
            <span>Items</span>
          </div>
        </Link>
        <Link to="/search">
          <div className="navBook">
            <img className="icon" src="https://i.ibb.co/10b0XX8/Asset-10.png" />
            <span>Search!</span>
          </div>
        </Link>
      </div>
      <div className="list">
        <div>
          {/* <div onClick={handleClose}> */}
          <Link to="/home" className="menuItem">
            <IconButton>
              <HomeIcon fontSize="large" />
            </IconButton>
            <span>Home</span>
          </Link>
        </div>
        <div>
          {/* <div onClick={handleClose}> */}
          <Link to="/cart" className="menuItem">
            <IconButton>
              <AddShoppingCartIcon fontSize="large" /> ({products.length})
            </IconButton>
            <span>Cart</span>
          </Link>
        </div>
        {loggedIn ? (
          <div className="innerList">
            <div>
              <div className="menuItem">
                <IconButton onClick={(e) => logoutUser(e)}>
                  <ExitToAppIcon fontSize="large" />
                </IconButton>
              </div>
              <span>Log Out</span>
            </div>
            {user.clearance === 5 ? (
              <div>
                <div>
                  <Link to="/admin">
                    <IconButton>
                      <SupervisorAccountIcon fontSize="large" />
                    </IconButton>
                    <span>Admin</span>
                  </Link>
                </div>
                <div>
                  <Link to="/registerAdmin">
                    <IconButton>
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                    <span>Admin Register</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/user">
                  <IconButton>
                    <AccountBoxIcon fontSize="large" />
                  </IconButton>
                  <span>Profile</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="logList">
            <div>
              <Link to="/login" className="menuItem">
                <IconButton>
                  <HowToRegIcon fontSize="large" />
                </IconButton>
                <span>Login</span>
              </Link>
            </div>
            <div>
              <Link to="/register" className="menuItem">
                <IconButton>
                  <CreateIcon fontSize="large" />
                </IconButton>
                <span>New User</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapState = ({input, form, cart, user}) => {
  const {toggle} = input;
  const {loggedIn} = form;
  const {products} = cart;
  return {
    toggle,
    loggedIn,
    products,
    user,
  };
};

const mapDispatch = (dispatch) => {
  const toggleMenu = (e, toggle) => {
    e.preventDefault();
    const newToggle = !toggle;
    dispatch(updateInput("toggle", newToggle));
  };
  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      await Axios.delete("/api/auth/logout");
      dispatch(clearForm());
      dispatch(clearUser());
      dispatch(logout());
      dispatch(fetchSessionOrder());
      return <Redirect to="/login" />;
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(clearInput());
  };
  return {
    toggleMenu,
    logoutUser,
    handleClose,
  };
};
export default connect(mapState, mapDispatch)(Nav);
