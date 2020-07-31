<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div
            className='nav' >
            <img src='./Tacks_Sign.png'
                className='logo'></img>
            <Link to='/home'>Home</Link>
            <Link to='/weapons'>Weapons</Link>
            <Link to='/armor'>Armor</Link>
            <Link to='/magic'>Magic</Link>
            <Link to='/items'>Items</Link>
            <Link to='/cart'>Cart</Link>
        </div>
    )
}
=======
import React from "react";
import {Link} from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/weapons">Weapons</Link>
      <Link to="/armor">Armor</Link>
      <Link to="/magic">Magic</Link>
      <Link to="/items">Items</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
};
>>>>>>> master

export default Nav;
