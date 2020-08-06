import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateInput, clearInput} from "../store/actions";

const ArmorPage = ({match, products, quantity, order, updateQuantity, addToCart}) => {
  if (products.length) {
    const armor = products.find((product) => product.id === match.params.id);
    const mapQuant = (num) => {
      const map = [];
      for (let i = 0; i <= num; i += 1) {
        map.push(<option key={i}>{i}</option>);
      }
      return map;
    };
    if (armor) {
      return (
        <div className="productCard">
          <h2>
            {armor.name} ({armor.price})
          </h2>
          <p>{armor.description}</p>
          <img className="productImg" src={armor.image} />
          <br />
          <select
            id="quantity"
            name="quantity"
            value={armor.id}
            onChange={(e) => updateQuantity(e)}
          >
            <option value="">-</option>
            {mapQuant(armor.quantity)}
          </select>
          <button type="button" onClick={(e) => addToCart(e, order, armor, quantity)}>
            Add to Cart
          </button>
        </div>
      );
    }
    return <h2>Armor Loading...</h2>;
  }
  return <h2>Armor Loading...</h2>;
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
  const addToCart = (e, order, armor, quantity) => {
    e.preventDefault();
  };
  return {
    dispatch,
    updateQuantity,
    addToCart,
  };
};

export default connect(mapState, mapDispatch)(ArmorPage);
