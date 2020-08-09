import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {IconButton} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import {updateInput, fetchWeapons, clearInput} from "../store/actions";

const WeaponsList = ({dispatch, products, handleChange, page, productsCount}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchWeapons());
    };
    getData();
  }, []);
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  if (products.length) {
    return (
      <div>
        <div className="productList">
          <div className="header">
            <h1>Weapons</h1>
          </div>
          <select
            id="sorting"
            name="sorting"
            // value={}
            // onChange={(e) => sortProducts(e)}
          >
            <option value="alpha">A-Z</option>
            <option value="revalpha">Z-A</option>
            <option value="cheapest">Lowest to Highest Prices</option>
            <option value="expoensive">Highest to Lowest Price</option>
          </select>
          <button type="button">Sort!</button>
          <div>
            <ul>
              {products.map((weapon) => {
                return (
                  <div key={weapon.id}>
                    <Link to={`/weapons/${weapon.id}`} key={weapon.id}>
                      {weapon.name} ({weapon.price})
                    </Link>
                  </div>
                );
              })}
            </ul>
          </div>
          <Pagination
            count={Math.ceil(productsCount / 5)}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            onChange={(e, value) => handleChange(e, value)}
          />
        </div>
        <div className="homeIcon">
          <IconButton>
            <Link to="/home">
              <HomeIcon fontSize="large" />
            </Link>
          </IconButton>
        </div>
      </div>
    );
  }
  return <h1>Weapons Loading...</h1>;
};

const mapState = ({products, count, input}) => {
  const {productsCount} = count;
  const {page} = input;
  return {
    products,
    page,
    productsCount,
  };
};

const mapDispatch = (dispatch) => {
  const handleChange = (e, value) => {
    e.preventDefault();
    dispatch(updateInput("page", value));
    dispatch(fetchWeapons(value));
  };
  return {
    dispatch,
    handleChange,
  };
};
export default connect(mapState, mapDispatch)(WeaponsList);
