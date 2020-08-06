import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {updateInput, fetchWeapons, clearInput} from "../store/actions";

const WeaponsList = ({dispatch, products, handleChange, page, productsCount}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchWeapons());
    };
    getData();
  }, []);
  useEffect(() => {
    dispatch(clearInput());
  }, []);
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
                <div key={weapon.id}>
                  <Link to={`/weapons/${weapon.id}`} key={weapon.id}>
                    {weapon.name} ({weapon.price})
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <Pagination
          count={Math.ceil(productsCount / 5)}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          onChange={(e, value) => handleChange(e, value)}
        />
      </div>
    );
  }
  return <h1>Weapons Loading...</h1>;
};

const mapState = ({products, count, input}) => {
  const {productsCount} = count;
  const {page} = input;
  return {
    products,
    page,
    productsCount,
  };
};

const mapDispatch = (dispatch) => {
  const handleChange = (e, value) => {
    e.preventDefault();
    dispatch(updateInput("page", value));
    dispatch(fetchWeapons(value));
  };
  return {
    dispatch,
    handleChange,
  };
};
export default connect(mapState, mapDispatch)(WeaponsList);
