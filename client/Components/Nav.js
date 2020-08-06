import React from "react";
import {Link, Redirect} from "react-router-dom";
import {IconButton, MenuList, MenuItem, Button} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import {connect} from "react-redux";
import Axios from "axios";

import {clearForm, updateInput, clearInput, fetchSessionOrder} from "../store/actions";

const Nav = ({loggedIn, toggle, toggleMenu, logout, handleClose, products}) => {
  return (
    <div className="nav">
      <img src="./Tacks_Sign.png" className="logo" />
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
            <Link to="/home">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
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
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/cart">Cart ({products.length})</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/search">Search!</Link>
          </MenuItem>
          {loggedIn ? (
            <div>
              {" "}
              <MenuItem>
                <Button
                  onClick={(e) => logout(e)}
                  className="menuItem"
                  variant="outlined"
                >
                  Logout
                </Button>{" "}
              </MenuItem>
            </div>
          ) : (
            <div className="menuR">
              <MenuItem>
                <Link to="/login" className="menuItem">
                  Log In
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register" className="menuItem">
                  Register
                </Link>
              </MenuItem>
            </div>
          )}
        </MenuList>
      ) : null}
    </div>
  );
};

const mapState = ({input, form, cart}) => {
  const {toggle} = input;
  const {loggedIn} = form;
  const {products} = cart;
  return {
    toggle,
    loggedIn,
    products,
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
