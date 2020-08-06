import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateInput, clearInput, updateCart} from "../store/actions";

const ItemPage = ({
  match,
  products,
  quantity,
  activeOrders,
  updateQuantity,
  addToCart,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  if (products.length) {
    const item = products.find((product) => product.id === match.params.id);
    const mapQuant = (num) => {
      const map = [];
      for (let i = 1; i <= num; i++) {
        map.push(<option key={i}>{i}</option>);
      }
      return map;
    };
    if (item) {
      return (
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
        </div>
      );
    }
    return <h2>Loading..</h2>;
  }
  return <h2>Loading..</h2>;
};
const mapState = ({products, input, orders}) => {
  const {quantity} = input;
  const {activeOrders} = orders;
  return {
    products,
    quantity,
    activeOrders,
  };
};

const mapDispatch = (dispatch) => {
  const updateQuantity = (e) => {
    dispatch(updateInput("quantity", e.target.value));
  };
  const addToCart = (e, order, item, quantity) => {
    e.preventDefault();
    dispatch(updateCart("add", order.id, item.id, quantity));
  };
  return {
    dispatch,
    updateQuantity,
    addToCart,
  };
};

export default connect(mapState, mapDispatch)(ItemPage);
