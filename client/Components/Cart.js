import React from "react";
import { connect } from "react-redux";

const Cart = ({ products, total, removeItem }) => {
  return (
    <div>
      <h2> My Shopping Cart </h2>
      <h4> {products.length} Items! </h4>
      <ul>
        {products &&
          products.map((product) => {
            return (
              <div>
                <li>product.name</li>
                <li>product.price</li>
                <button onClick={(e) => removeItem(e, product)}>Remove</button>
              </div>
            );
          })}
      </ul>
      <div>
        <h3>Total</h3>
        <span>${total}</span>
      </div>
    </div>
  );
};

const mapState = ({ cart }) => {
  const { products, total } = cart;
  return {
    products,
    total,
  };
};

const mapDispatch = (dispatch) => {
  const removeItem = (e, product) => {
    e.preventDefault();
    dispatch(removeFromCart(product));
  };
  return {
    removeItem,
  };
};
export default connect(mapState, mapDispatch)(Cart);
