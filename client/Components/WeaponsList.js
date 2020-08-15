import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {IconButton} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import {
  updateInput,
  fetchWeapons,
  clearInput,
  fetchSelectedProduct,
} from "../store/actions";

const WeaponsList = ({
  dispatch,
  products,
  handleChange,
  page,
  productsCount,
  setCurProduct,
}) => {
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
      <div className="listDiv">
        <div className="productList">
          <div className="header">
            <h1>Weapons</h1>
          </div>
          <div>
            <ul>
              {products.map((weapon) => {
                return (
                  <div className="card" key={weapon.id}>
                    <div className="itemCard">
                      {weapon.name} (${weapon.price})
                      <Link
                        to={`/selectedProduct/${weapon.id}`}
                        key={weapon.id}
                        onClick={(e) => setCurProduct(e, weapon.id)}
                      >
                        See Details
                      </Link>
                    </div>
                    <img
                      src={weapon.image}
                      alt="weapon"
                      width={200}
                      height={150}
                      className="listImg"
                    />
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
            color="secondary"
            variant="outlined"
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
  console.log(products);
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
  const setCurProduct = async (e, id) => {
    dispatch(fetchSelectedProduct(id));
  };
  return {
    dispatch,
    handleChange,
    setCurProduct,
  };
};
export default connect(mapState, mapDispatch)(WeaponsList);
