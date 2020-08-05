import React from "react";
import {connect} from "react-redux";
import {updateInput, clearInput} from "../store/actions";

const SpellPage = ({match, products, quantity, order, updateQuantity, addToCart}) => {
  if (products.length) {
    const spell = products.find((product) => product.id === match.params.id);
    const mapQuant = (num) => {
      const map = [];
      for (let i = 0; i <= num; i += 1) {
        map.push(<option key={i}>{i}</option>);
      }
      return map;
    };
    if (spell) {
      return (
        <div className="productCard">
          <h2>
            {spell.name} ({spell.price})
          </h2>
          <p>{spell.description}</p>
          <img className="productImg" src={spell.image} alt="" />
          <br />
          <select
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => updateQuantity(e)}
          >
            <option value="">-</option>
            {mapQuant(spell.quantity)}
          </select>
          <button type="button" onClick={(e) => addToCart(e, order, spell, quantity)}>
            Add to Cart
          </button>
        </div>
      );
    }
    return <h2>Spell Loading...</h2>;
  }
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

export default connect(mapState, mapDispatch)(SpellPage);
