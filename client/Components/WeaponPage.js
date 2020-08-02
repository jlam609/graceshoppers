import React from "react";
import {connect} from "react-redux";
import {updateInput, clearInput} from "../store/actions";

const WeaponPage = ({match, products, quantity, order, updateQuantity, addToCart}) => {
  if (products.length) {
    const weapon = products.find((product) => product.id === match.params.id);
    const mapQuant = (num) => {
      const map = [];
      for (let i = 0; i <= num; i += 1) {
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
            <option value="">0</option>
            {mapQuant(weapon.quantity)}
          </select>
          <button type="button" onClick={(e) => addToCart(e, order, weapon, quantity)}>
            Add to Cart
          </button>
        </div>
      );
    }
    return <h2>WeaponLoading</h2>;
  }
  return <h2>WeaponLoading</h2>;
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
    console.log(order, weapon, quantity);
  };
  return {
    dispatch,
    updateQuantity,
    addToCart,
  };
};

export default connect(mapState, mapDispatch)(WeaponPage);
