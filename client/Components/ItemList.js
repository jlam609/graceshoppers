import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {IconButton} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import {
  updateInput,
  fetchItems,
  clearInput,
  fetchSelectedProduct,
} from "../store/actions";

const ItemsList = ({
  dispatch,
  products,
  handleChange,
  page,
  productsCount,
  setCurProduct,
}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchItems());
    };
    getData();
  }, []);
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  if (products.length) {
    return (
      <div className="listDiv">
        <div className="productList">
          <div className="header">
            <h1>Items</h1>
          </div>
          <div>
            <ul>
              {products.map((item) => {
                return (
                  <div key={item.id}>
                    <Link
                      to={`/selectedProduct/${item.id}`}
                      key={item.id}
                      onClick={(e) => setCurProduct(e, item.id)}
                    >
                      {item.name} ({item.price})
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
  return <h1>Items Loading...</h1>;
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
    dispatch(fetchItems(value));
  };
  const setCurProduct = async (e, id) => {
    dispatch(fetchSelectedProduct(id));
  };
  return {
    dispatch,
    handleChange,
    setCurProduct,
  };
};
export default connect(mapState, mapDispatch)(ItemsList);
