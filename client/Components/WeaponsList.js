import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {updateInput, fetchProducts, fetchWeapons} from "../store/actions";

const WeaponsList = ({dispatch, products, handleChange, page, productsCount}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchWeapons());
    };
    getData();
  }, []);
  console.log(products);
  if (products.length) {
    return (
      <div className="productList">
        <div className="header">
          <h1>Weapons</h1>
        </div>
        <div>
          <ul>
            {products.map((weapon) => {
              return (
                <div key={products.id}>
                  <Link to={`/weapons/${weapon.id}`} key={weapon.id}>
                    {weapon.name} ({weapon.price})
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <Pagination
          count={Math.ceil(productsCount / 10)}
          page={page}
          onChange={handleChange}
        />
      </div>
    );
  }
  return <h1>Weapons Loading...</h1>;
};

const mapState = ({products, count, input}) => {
  const {productsCount} = count;
  const {page, product, filter} = input;
  return {
    products,
    page,
    productsCount,
  };
};

const mapDispatch = (dispatch) => {
  const handleChange = (e, value) => {
    e.preventDefault();
    console.log(value);
    dispatch(updateInput("page", value));
    dispatch(fetchProducts(value));
  };
  return {
    dispatch,
    handleChange,
  };
};
export default connect(mapState, mapDispatch)(WeaponsList);
