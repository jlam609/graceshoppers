import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home">
      <img className="shopKeep" src="./Shopkeep.png" alt="" />
      <div className="bookContainer">
        <div>
          <img className="book" src="./Blue_Book.png" alt="" />
          <Link to="/weapons">Weapons</Link>
        </div>
        <div>
          <img className="book" src="./Red_Book.png" alt="" />
          <Link to="/armor">Armor</Link>
        </div>
        <div>
          <img className="book" src="./Purple_Book.png" alt="" />
          <Link to="/magic">Magic</Link>
        </div>
        <div>
          <img className="book" src="./Green_Book.png" alt="" />
          <Link to="/items">Items</Link>
        </div>
      </div>
      <div>
        <img className="table" src="./Table.png" />
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
};

export default HomePage;
