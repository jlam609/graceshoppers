import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Card, CardContent, CardActions, Button} from "@material-ui/core";
import {updateCart, clearInput, updateInput} from "../store/actions";

const Cart = ({
  products,
  total,
  removeItem,
  itemQuantity,
  quantity,
  dispatch,
  updateQuantity,
  activeOrders,
  checkout,
}) => {
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  const createOption = (num) => {
    const options = [];
    for (let i = 1; i < num; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  return (
    <div className="cart">
      <h2> My Shopping Cart </h2>
      <h4> {itemQuantity} Items! </h4>
      <ul>
        {products.length ? (
          products.map((product) => {
            return (
              <div key={product.id}>
                <Card>
                  <div>
                    <CardContent className="card">
                      <li>Name: {product.product.name}</li>
                      <li>Price: {product.product.price}</li>
                      <li>Quantity: {product.quantity}</li>
                      <img src={product.product.image} width={100} height={100} alt="" />
                    </CardContent>
                    <CardActions>
                      <select value={quantity} onChange={(e) => updateQuantity(e)}>
                        <option value={0}>0</option>
                        {createOption(product.quantity)}
                        <option value="remove all">Remove all</option>
                      </select>
                      <Button
                        onClick={(e) => removeItem(e, activeOrders, product, quantity)}
                        variant="outlined"
                      >
                        Remove Item
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </div>
            );
          })
        ) : (
          <h2>No items in cart! Buy Items</h2>
        )}
      </ul>
      <div>
        <h3>Total Amount ({itemQuantity}) Items</h3>
        <hr />
        <span>${total}</span>
        <hr />
        <Button variant="outlined" onClick={(e) => checkout(e)}>
          Submit Order
        </Button>
      </div>
    </div>
  );
};

const mapState = ({cart, input, orders}) => {
  const {products, total, itemQuantity} = cart;
  const {quantity} = input;
  const {activeOrders} = orders;
  return {
    products,
    total,
    itemQuantity,
    activeOrders,
    quantity,
  };
};

const mapDispatch = (dispatch) => {
  const removeItem = async (e, order, product, quantity) => {
    e.preventDefault();
    if (quantity === "remove all") {
      return dispatch(updateCart("remove", order.id, product.productId, quantity));
    }
    await dispatch(updateCart("remove", order.id, product.productId, -quantity));
  };
  const updateQuantity = (e) => {
    return dispatch(updateInput("quantity", e.target.value));
  };
  const checkout = (e) => {
    e.preventDefault();
    window.location.href = "/checkout";
  };
  return {
    removeItem,
    dispatch,
    updateQuantity,
    checkout,
  };
};
export default connect(mapState, mapDispatch)(Cart);
