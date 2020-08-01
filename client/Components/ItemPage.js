import React from "react";
import {connect} from "react-redux";

const ItemPage = ({match, products}) => {
  const item = products.filter((product) => product.id === match.params.id);
  const myItem = item[0];
  const quantity = myItem.quantity;
  const mapQuant = (num) => {
    for (let i = 0; i <= num.length; i += 1) {
      return <option>i</option>;
    }
  };
  if (item.length) {
    return (
      <div className="productCard">
        <h2>
          {myItem.name} ({myItem.price})
        </h2>
        <p>{myItem.description}</p>
        <img className="productImg" src={myItem.image} alt="" />
        <br />
        <select id="quantity" name="quantity" value={myItem.id}>
          <option value="">0</option>
          {mapQuant(quantity)}
        </select>
        <button type="button">Add to Cart</button>
      </div>
    );
  }
  return <h2>Item Loading</h2>;
};

const mapState = ({products}) => {
  return {
    products,
  };
};

export default connect(mapState)(ItemPage);
