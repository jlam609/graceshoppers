/* eslint-disable react/jsx-curly-newline */
import React from "react";
import {connect} from "react-redux";
import {Card, CardContent} from "@material-ui/core";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {checkout, clearCart, createOrder} from "../store/actions";

toast.configure();

const Checkout = ({
  products,
  total,
  itemQuantity,
  dispatch,
  handleToken,
  activeOrders,
}) => {
  return (
    <div className="cart">
      <h2> Order Summary </h2>
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
                  </div>
                </Card>
              </div>
            );
          })
        ) : (
          <h2>No items in order! Buy Items</h2>
        )}
      </ul>
      <div>
        <h3>Total Amount ({itemQuantity}) Items</h3>
        <hr />
        <span>${total}</span>
        <hr />
        <StripeCheckout
          stripeKey="pk_test_51HCwhGEv262H36bAoDHALNbabMz6LZo70d71ShoGGqH9DXLVytP38Sev2O8MrlfSrfvAtwoM9Wr6yhQW3cYfWM5T00yHeyZPh9"
          token={(token, addresses) =>
            handleToken(token, addresses, total, activeOrders, products)
          }
          amount={total * 100}
          name="My Orders"
          billingAddress
          shippingAddress
        />
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
  const handleToken = async (token, addresses, total, activeOrders, products) => {
    const response = await axios.post("/api/stripe/checkout", {
      token,
      addresses,
      total,
      activeOrders,
    });
    const {status} = response.data;
    if (status === "success") {
      await dispatch(checkout(products));
      await dispatch(clearCart());
      if (activeOrders.userId) {
        await dispatch(createOrder("user", activeOrders.userId));
      } else {
        await dispatch(createOrder("session", activeOrders.sessionId));
      }
      toast("Success! You have checked out!", {type: "success"});
    } else {
      toast("Error checking out!", {type: "error"});
    }
  };
  return {
    dispatch,
    handleToken,
  };
};
export default connect(mapState, mapDispatch)(Checkout);
