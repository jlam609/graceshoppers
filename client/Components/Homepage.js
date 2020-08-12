import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home">
      <div className="bookContainer">
        <div>
          <Link to="/weapons">
            <img
              src="https://i.ibb.co/3fdkKKn/Red-Book.png"
              alt="Red-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
        <div>
          <Link to="/armors">
            <img
              src="https://i.ibb.co/gzzFKZd/Blue-Book.jpg"
              alt="Blue-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
        <div>
          <Link to="/magic">
            <img
              src="https://i.ibb.co/3rrvwbf/Green-Book.jpg"
              alt="Green-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
        <div>
          <Link to="/items">
            <img
              src="https://i.ibb.co/gPrcDm9/Purple-Book.jpg"
              alt="Purple-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
      </div>
      <div>
        <img className="table" src="https://i.ibb.co/PFx6m1T/Brown-Table.png" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
