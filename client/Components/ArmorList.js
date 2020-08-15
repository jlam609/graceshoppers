import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {IconButton} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import {
  updateInput,
  fetchArmor,
  clearInput,
  fetchSelectedProduct,
} from "../store/actions";

const ArmorList = ({
  dispatch,
  products,
  handleChange,
  page,
  productsCount,
  setCurProduct,
}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchArmor());
    };
    getData();
    dispatch(clearInput());
  }, []);
  if (products.length) {
    return (
      <div className="listDiv">
        <div className="productList">
          <div className="header">
            <h1>Armor</h1>
          </div>
          <div>
            <ul>
              {products.map((armor) => {
                return (
                  <div className="card" key={armor.id}>
                    <div className="itemCard">
                      {armor.name} (${armor.price})
                      <Link
                        to={`/selectedProduct/${armor.id}`}
                        key={armor.id}
                        onClick={(e) => setCurProduct(e, armor.id)}
                      >
                        See Details
                      </Link>
                    </div>
                    <img
                      src={armor.image}
                      alt="armor"
                      width={200}
                      height={150}
                      className="listImg"
                    />
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
            variant="outlined"
            color="secondary"
          />
        </div>
        <div className="homeIcon">
          <IconButton>
            <Link to="/home">
              <HomeIcon fontSize="large" />
            </Link>
          </IconButton>
        </div>
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
  const setCurProduct = async (e, id) => {
    dispatch(updateInput("loading", true));
    dispatch(fetchSelectedProduct(id));
  };
  return {
    dispatch,
    handleChange,
    setCurProduct,
  };
};
export default connect(mapState, mapDispatch)(ArmorList);
