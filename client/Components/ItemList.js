import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {updateInput, fetchProducts} from "../store/actions";

const ItemList = ({products, page, handleChange, productsCount}) => {
  if (products.length) {
    const items = products.filter((item) => item.categoryId === 4);
    return (
      <div className="productList">
        <h1 className="header">Items</h1>
        <div>
          <ul>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <Link to={`/items/${item.id}`} key={item.id}>
                    {item.name}
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
  return <h1>Items Loading...</h1>;
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

export default connect(mapState, mapDispatch)(ItemList);
