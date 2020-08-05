import React from "react";
import {connect} from "react-redux";
import {updateInput, clearInput} from "../store/actions";

const ItemPage = ({match, products, quantity, order, updateQuantity, addToCart}) => {
  if (products.length) {
    const item = products.find((product) => product.id === match.params.id);
    const mapQuant = (num) => {
      const map = [];
      for (let i = 0; i <= num; i += 1) {
        map.push(<option key={i}>{i}</option>);
      }
      return map;
    };
    if (item) {
      return (
        <div className="productCard">
          <h2>
            {item.name} ({item.price})
          </h2>
          <p>{item.description}</p>
          <img className="productImg" src={item.image} alt="" />
          <br />
          <select
            id="quantity"
            name="quantity"
            value={item.id}
            onChange={(e) => updateQuantity(e)}
          >
            <option value="">-</option>
            {mapQuant(item.quantity)}
          </select>
          <button type="button" onClick={(e) => addToCart(e, order, item, quantity)}>
            Add to Cart
          </button>
        </div>
      );
    }
    return <h2>Item Loading...</h2>;
  }
  return <h2>Item Loading...</h2>;
};

const mapState = ({products, input, order}) => {
  const {quantity} = input;
  return {
    products,
    quantity,
    order,
  };
};

const mapDispatch = (dispatch) => {
  const updateQuantity = (e) => {
    dispatch(updateInput("quantity", e.target.value));
  };
  const addToCart = (e, order, weapon, quantity) => {
    e.preventDefault();
  };
  return {
    dispatch,
    updateQuantity,
    addToCart,
  };
};

export default connect(mapState, mapDispatch)(ItemPage);
