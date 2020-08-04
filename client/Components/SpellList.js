import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import {Pagination} from "@material-ui/lab/Pagination";
import {updateInput, fetchProducts} from "../store/actions";

const SpellList = ({products, handleChange, page, productsCount}) => {
  if (products.length) {
    const spells = products.filter((spell) => spell.categoryId === 3);
    return (
      <div className="productList">
        <h1 className="header">Magic</h1>
        <div>
          <ul>
            {spells.map((spell) => {
              return (
                <div key={spell.id}>
                  <Link to={`/magic/${spell.id}`} key={spell.id}>
                    {spell.name}
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <Pagination
          count={Math.ceil(productsCount / 10)}
          page={page}
          onChange={handleChange}
        />
      </div>
    );
  }
  return <h1>Spells Loading...</h1>;
};

const mapState = ({products, count, input}) => {
  const {productsCount} = count;
  const {page, product, filter} = input;
  return {
    products,
    page,
    productsCount,
  };
};

const mapDispatch = (dispatch) => {
  const handleChange = (e, value) => {
    e.preventDefault();
    console.log(value);
    dispatch(updateInput("page", value));
    dispatch(fetchProducts(value));
  };
  return {
    handleChange,
  };
};

export default connect(mapState, mapDispatch)(SpellList);
