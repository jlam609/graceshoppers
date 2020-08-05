import React from "react";
import {connect} from "react-redux";
import {updateInput, clearInput, updateCart, fetchCart} from "../store/actions";

const WeaponPage = ({
  match,
  products,
  quantity,
  activeOrders,
  updateQuantity,
  addToCart,
}) => {
  if (products.length) {
    const weapon = products.find((product) => product.id === match.params.id);
    const mapQuant = (num) => {
      const map = [];
      for (let i = 1; i <= num; i++) {
        map.push(<option key={i}>{i}</option>);
      }
      return map;
    };
    if (weapon) {
      return (
        <div className="productCard">
          <h2>
            {weapon.name}({weapon.price})
          </h2>
          <p>{weapon.description}</p>
          <img className="productImg" src={weapon.image} alt="" />
          <br />
          <select
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => updateQuantity(e)}
          >
            <option value="">—</option>
            {mapQuant(weapon.quantity)}
          </select>
          <button
            type="button"
            onClick={(e) => addToCart(e, activeOrders, weapon, quantity)}
          >
            Add to Cart
          </button>
        </div>
      );
    }
    return <h2>WeaponLoading</h2>;
  }
  return <h2>WeaponLoading</h2>;
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
  const addToCart = (e, order, weapon, quantity) => {
    e.preventDefault();
    dispatch(updateCart("add", order.id, weapon, quantity));
  };
  return {
    dispatch,
    updateQuantity,
    addToCart,
  };
};

export default connect(mapState, mapDispatch)(WeaponPage);
