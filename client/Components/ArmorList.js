import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import {Pagination} from "@material-ui/lab/Pagination";
import {updateInput, fetchProducts} from "../store/actions";

const ArmorList = ({products, page, productsCount, handleChange}) => {
  if (products.length) {
    const armors = products.filter((armor) => armor.categoryId === 2);
    console.log(armors);
    return (
      <div className="productList">
        <h1 className="header">Armor</h1>
        <div>
          <ul>
            {armors.map((armor) => {
              return (
                <div key={armor.id}>
                  <Link to={`/armor/${armor.id}`} key={armor.id}>
                    {armor.name}
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
  return <h1>Armor Loading...</h1>;
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

export default connect(mapState, mapDispatch)(ArmorList);
