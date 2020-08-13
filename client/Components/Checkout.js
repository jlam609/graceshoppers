/* eslint-disable react/jsx-curly-newline */
import React from "react";
import {connect} from "react-redux";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {checkout, clearCart, createOrder} from "../store/actions";

toast.configure();

const useStyles = makeStyles({
  table: {
    overflowX: "scroll",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    opacity: "80%",
    width: "70vw",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

const Checkout = ({
  products,
  total,
  itemQuantity,
  dispatch,
  handleToken,
  activeOrders,
}) => {
  const classes = useStyles();
  return (
    <div className="checkout">
      <h2> Order Summary </h2>
      <hr />
      <h4> {itemQuantity} Items! </h4>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length ? (
              products.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.product.name}
                  </TableCell>
                  <TableCell align="right">{row.product.id}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.product.description}</TableCell>
                  <TableCell align="right">{row.product.price}</TableCell>
                  <TableCell align="right">
                    <img
                      src={row.product.image}
                      alt={row.product.name}
                      height={125}
                      width={155}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No items in order! Buy Items</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
