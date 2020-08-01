import React from "react";
import {connect} from "react-redux";

const WeaponPage = ({match, products}) => {
  if (products.length) {
    const weapon = products.filter((product) => product.id === match.params.id);
    const myWeapon = weapon[0];
    const quantity = myWeapon.quantity;
    const mapQuant = (num) => {
      for (let i = 0; i <= num.length; i += 1) {
        return <option>i</option>;
      }
    };
    if (weapon.length) {
      return (
        <div className="productCard">
          <h2>
            {myWeapon.name}({myWeapon.price})
          </h2>
          <p>{myWeapon.description}</p>
          <img className="productImg" src={myWeapon.image} alt="" />
          <br />
          <select id="quantity" name="quantity" value={myWeapon.id}>
            <option value="">0</option>
            {mapQuant(quantity)}
          </select>
          <button type="button">Add to Cart</button>
        </div>
      );
    }
    return <h2>WeaponLoading</h2>;
  }
  return <h2>WeaponLoading</h2>;
};
const mapState = ({products}) => {
  return {
    products,
  };
};

export default connect(mapState)(WeaponPage);
