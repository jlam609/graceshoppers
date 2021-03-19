import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home">
      <div className="welcome">
        <h1>Welcome to Tacks: The Wonder Store!</h1>
        <div className="innerWelcome">
          <p>
            Tack's is the place for your every-day, video gaming items needs! Whether
            you're looking for some new equipment, a powerful spell, or a healing elixir,
            Tack has got you covered. Just start browsing by clicking on a book, or click
            on the search book in your "Bag" above if you know what you're looking for!
          </p>
        </div>
      </div>
      <div className="bookContainer">
        <div>
          <Link to="/weapons">
            <img
              src="https://i.ibb.co/m6Yrq0S/Weapons-Book.png"
              alt="Red-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
        <div>
          <Link to="/armors">
            <img
              src="https://i.ibb.co/4JJW6RS/Armor-Book.png"
              alt="Blue-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
        <div>
          <Link to="/magic">
            <img
              src="https://i.ibb.co/wMFp816/Magic-Book.png"
              alt="Green-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
        <div>
          <Link to="/items">
            <img
              src="https://i.ibb.co/xHkvzjg/Item-Book.png"
              alt="Purple-Book"
              border="0"
              className="book"
            />
          </Link>
        </div>
      </div>
      <div>
        <img className="table" src="https://i.ibb.co/zFHv9fs/Table-lit.png" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
