import React from "react";
import {connect} from "react-redux";
import {Card, CardContent, CardActions, Button} from "@material-ui/core";
import {removeFromCart, fetchCart} from "../store/actions";

const Cart = ({products, total, removeItem, quantity}) => {
  return (
    <div className="cart">
      <h2> My Shopping Cart </h2>
      <h4> {quantity} Items! </h4>
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
                      <Button onClick={(e) => removeItem(e, product)} variant="outlined">
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
        <h3>Total Amount ({quantity}) Items</h3>
        <hr />
        <span>${total}</span>
        <hr />
        <Button variant="outlined">Submit Order</Button>
      </div>
    </div>
  );
};

const mapState = ({cart}) => {
  const {products, total, quantity} = cart;
  console.log(products, total, quantity);
  return {
    products,
    total,
    quantity,
  };
};

const mapDispatch = (dispatch) => {
  const removeItem = async (e, product) => {
    e.preventDefault();
    await dispatch(removeFromCart(product));
  };
  return {
    removeItem,
  };
};
export default connect(mapState, mapDispatch)(Cart);
