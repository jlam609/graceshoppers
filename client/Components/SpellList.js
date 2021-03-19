import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {IconButton} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import {
  updateInput,
  fetchSpells,
  clearInput,
  fetchSelectedProduct,
} from "../store/actions";

const SpellList = ({
  dispatch,
  products,
  handleChange,
  page,
  productsCount,
  setCurProduct,
}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchSpells());
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
            <h1>Magic</h1>
          </div>
          <div>
            <ul>
              {products.map((spell) => {
                return (
                  <div className="card" key={spell.id}>
                    <div className="itemCard">
                      {spell.name} (${spell.price})
                      <Link
                        to={`/selectedProduct/${spell.id}`}
                        key={spell.id}
                        onClick={(e) => setCurProduct(e, spell.id)}
                      >
                        See Details
                      </Link>
                    </div>
                    <img
                      src={spell.image}
                      alt="spell"
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
            variant="outlined"
            color="secondary"
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
  return <h1>Spells Loading...</h1>;
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
    dispatch(fetchSpells(value));
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

export default connect(mapState, mapDispatch)(SpellList);
