import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchCategories, fetchProducts} from "../store/actions";

const ArmorPage = ({match, products, dispatch}) => {
  console.log("products", products);
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchProducts());
    };
    getData();
  }, []);

  if (products.length) {
    const armor = products.filter((product) => product.id === match.params.id);
    const myArmor = armor[0];
    const quantity = myArmor.quantity;
    const mapQuant = (num) => {
      for (let i = 0; i <= num.length; i += 1) {
        return <option>i</option>;
      }
    };
    return (
      <div className="productCard">
        <h2>
          {myArmor.name} ({myArmor.price})
        </h2>
        <p>{myArmor.description}</p>
        <img className="productImg" src={myArmor.image} />
        <br />
        <select id="quantity" name="quantity" defaultValue={myArmor.id}>
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

const mapDispatchToProps = (dispatch) => {
  return {dispatch};
};

export default connect(mapState, mapDispatchToProps)(ArmorPage);
