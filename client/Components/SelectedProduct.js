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
  updateRating,
  rValue,
  average,
  user,
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
        await dispatch(fetchSelectedProduct(match.params.id));
      } catch (e) {
        console.log(e, "failure to find item");
        dispatch(updateInput("failed", true));
      }
    };
    fetchProduct();
    dispatch(clearInput());
    console.log("selected Product effect used!");
  }, []);
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
            <p>Average rating is: {average}</p>
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
            <button type="button" onClick={(e) => dispatch(addRating(rValue, item.id))}>
              Submit Rating
            </button>
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
const mapState = ({products, input, orders, count, user, rating}) => {
  const {average, rValue} = rating;
  const {quantity, failed} = input;
  const {activeOrders} = orders;
  const {item} = count;
  return {
    failed,
    products,
    quantity,
    activeOrders,
    item,
    user,
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
