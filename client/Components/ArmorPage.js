import React from "react";
import {connect} from "react-redux";

const ArmorPage = ({match, products}) => {
  const armor = products.filter((product) => product.id === match.params.id);
  const myArmor = armor[0];
  const quantity = myArmor.quantity;
  const mapQuant = (num) => {
    for (let i = 0; i <= num.length; i += 1) {
      return <option>i</option>;
    }
  };
  if (armor.length) {
    return (
      <div className="productCard">
        <h2>
          {myArmor.name} ({myArmor.price})
        </h2>
        <p>{myArmor.description}</p>
        <img className="productImg" src={myArmor.image} />
        <br />
        <select id="quantity" name="quantity" value={myArmor.id}>
          <option value="">0</option>
          {mapQuant(quantity)}
        </select>
        <button type="button">Add to Cart</button>
      </div>
    );
  }
  return <h2>Armor Loading</h2>;
};

const mapState = ({products}) => {
  return {
    products,
  };
};

export default connect(mapState)(ArmorPage);
