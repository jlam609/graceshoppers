import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {updateInput, fetchArmor, clearInput} from "../store/actions";

const ArmorList = ({dispatch, products, handleChange, page, productsCount}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchArmor());
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
          <h1>Armor</h1>
        </div>
        <div>
          <ul>
            {products.map((armor) => {
              return (
                <div key={armor.id}>
                  <Link to={`/armor/${armor.id}`} key={armor.id}>
                    {armor.name} ({armor.price})
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
  return <h1>Armor Loading...</h1>;
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
    dispatch(fetchArmor(value));
  };
  return {
    dispatch,
    handleChange,
  };
};
export default connect(mapState, mapDispatch)(ArmorList);
