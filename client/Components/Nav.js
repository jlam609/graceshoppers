import React from "react";
import {Link, Redirect} from "react-router-dom";
import {IconButton, MenuList, MenuItem, Button} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import HomeIcon from "@material-ui/icons/Home";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import CreateIcon from "@material-ui/icons/Create";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import {connect} from "react-redux";
import Axios from "axios";

import {
  clearForm,
  updateInput,
  clearInput,
  fetchSessionOrder,
  clearUser,
} from "../store/actions";

const Nav = ({loggedIn, toggle, toggleMenu, logout, handleClose, products, user}) => {
  return (
    <div className="nav">
      <img
        src="https://i.ibb.co/HY7x7f2/Tacks-Sign.png"
        alt="Tacks-Sign"
        border="0"
        className="logo"
      />
      <IconButton
        edge="start"
        aria-label="menu"
        color="inherit"
        onClick={(e) => toggleMenu(e, toggle)}
      >
        <StarsIcon />
      </IconButton>
      {toggle ? (
        <MenuList className="list">
          <MenuItem onClick={handleClose}>
            <Link to="/home">
              <IconButton>
                <HomeIcon fontSize="large" />
              </IconButton>
            </Link>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>
            <Link to="/weapons">Weapons</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/armor">Armor</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/magic">Magic</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/items">Items</Link>
          </MenuItem> */}
          <MenuItem onClick={handleClose}>
            <Link to="/cart">
              <IconButton>
                <AddShoppingCartIcon /> ({products.length})
              </IconButton>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/search">
              <IconButton>
                <SearchIcon fontSize="large" />
              </IconButton>
            </Link>
          </MenuItem>
          {loggedIn ? (
            <div className="list">
              {" "}
              <MenuItem>
                <IconButton onClick={(e) => logout(e)}>
                  <ExitToAppIcon fontSize="large" />
                </IconButton>
              </MenuItem>
              {user.clearance === 5 ? (
                <MenuItem>
                  <Link to="/admin" className="menuItem">
                    <IconButton>
                      <SupervisorAccountIcon fontSize="large" />
                    </IconButton>
                  </Link>
                </MenuItem>
              ) : null}
            </div>
          ) : (
            <div className="list">
              <MenuItem>
                <Link to="/login" className="menuItem">
                  <IconButton>
                    <HowToRegIcon fontSize="large" />
                  </IconButton>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register" className="menuItem">
                  <IconButton>
                    <CreateIcon fontSize="large" />
                  </IconButton>
                </Link>
              </MenuItem>
            </div>
          )}
        </MenuList>
      ) : null}
    </div>
  );
};

const mapState = ({input, form, cart, user}) => {
  const {toggle} = input;
  const {loggedIn} = form;
  const {products} = cart;
  console.log(user, loggedIn);
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
  const logout = async (e) => {
    e.preventDefault();
    try {
      await Axios.delete("/api/auth/logout");
      dispatch(clearForm());
      dispatch(clearUser());
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
    logout,
    handleClose,
  };
};
export default connect(mapState, mapDispatch)(Nav);
