import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
  updateInput,
  clearInput,
  updateCart,
  fetchSelectedProduct,
  addRating,
  getRating,
} from "../store/actions";
import {useHistory} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";

const SelectedProduct = ({
  exists,
  user,
  updateRating,
  rValue,
  average,
  loggedIn,
  match,
  quantity,
  activeOrders,
  updateQuantity,
  addToCart,
  dispatch,
  item,
  failed,
}) => {
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (user.id) {
          await dispatch(fetchSelectedProduct(match.params.id, user.id));
        }
      } catch (e) {
        dispatch(updateInput("failed", true));
      }
    };
    fetchProduct();
    dispatch(clearInput());
  }, [user]);
  const history = useHistory();
  if (item.name) {
    const mapQuant = (num) => {
      const map = [];
      for (let i = 1; i <= num; i++) {
        map.push(<option key={i}>{i}</option>);
      }
      return map;
    };
    if (item.name) {
      return (
        <div>
          <div className="productCard">
            <h2>
              {item.name}({item.price})
            </h2>
            <p>{item.description}</p>
            <img className="productImg" src={item.image} alt="" />
            <br />
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => updateQuantity(e)}
            >
              <option value="">0</option>
              {mapQuant(item.quantity)}
            </select>
            <button
              type="button"
              onClick={(e) => addToCart(e, activeOrders, item, quantity)}
              disabled={!!(!quantity || !item.quantity)}
            >
              Add to Cart
            </button>
            <p>Average rating: {average}</p>
            {loggedIn ? (
              <div>
                <select
                  id="rating"
                  name="rating"
                  value={rValue}
                  onChange={(e) => updateRating(e)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button
                  type="button"
                  onClick={(e) => dispatch(addRating(rValue, item.id, user.id))}
                  disabled={!!exists}
                >
                  Submit Rating
                </button>
              </div>
            ) : (
              <div>
                <p>(Log in to submit a rating!)</p>
              </div>
            )}
          </div>
          <div className="homeIcon">
            <IconButton onClick={(e) => history.goBack()}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      );
    }
  }
  if (!failed) {
    return (
      <div className="loadingDiv">
        <CircularProgress className="loading" />
      </div>
    );
  }
  return (
    <div className="errorDiv">
      <p>Sorry, item could not be found.</p>
      <div className="backButton">
        <IconButton onClick={(e) => history.goBack()} className="backButton">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};
const mapState = ({products, input, orders, count, form, rating, user}) => {
  const {average, rValue, exists} = rating;
  const {quantity, failed} = input;
  const {activeOrders} = orders;
  const {item} = count;
  const {loggedIn} = form;
  console.log(activeOrders);
  return {
    exists,
    user,
    loggedIn,
    failed,
    products,
    quantity,
    activeOrders,
    item,
    average,
    rValue,
  };
};

const mapDispatch = (dispatch) => {
  const updateQuantity = (e) => {
    dispatch(updateInput("quantity", e.target.value));
  };
  const updateRating = (e) => {
    dispatch(getRating(e.target.value));
  };
  const addToCart = (e, order, item, quantity) => {
    e.preventDefault();
    console.log(order, item, quantity);
    dispatch(updateCart("add", order.id, item.id, quantity));
  };
  return {
    dispatch,
    updateQuantity,
    addToCart,
    updateRating,
  };
};

export default connect(mapState, mapDispatch)(SelectedProduct);
