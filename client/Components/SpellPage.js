import React from "react";
import {connect} from "react-redux";

const SpellPage = ({match, products}) => {
  const spell = products.filter((product) => product.id === match.params.id);
  const mySpell = spell[0];
  const quantity = mySpell.quantity;
  const mapQuant = (num) => {
    for (let i = 0; i <= num.length; i += 1) {
      return <option>i</option>;
    }
  };
  if (spell.length) {
    return (
      <div className="productCard">
        <h2>
          {mySpell.name} ({mySpell.price})
        </h2>
        <p>{mySpell.description}</p>
        <img className="productImg" src={mySpell.image} alt="" />
        <br />
        <select id="quantity" name="quantity" value={mySpell.id}>
          <option value="">0</option>
          {mapQuant(quantity)}
        </select>
        <button type="button">Add to Cart</button>
      </div>
    );
  }
  return <h2>Spell Loading...</h2>;
};

const mapState = ({products}) => {
  return {
    products,
  };
};

export default connect(mapState)(SpellPage);
