import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {IconButton} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import {
  fetchProducts,
  clearInput,
  updateInput,
  fetchSelectedProduct,
} from "../store/actions";

const SearchList = ({
  searchProducts,
  dispatch,
  products,
  filter,
  changeFilter,
  handlePage,
  page,
  productsCount,
  setCurProduct,
}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchProducts());
    };
    getData();
  }, []);
  useEffect(() => {
    dispatch(clearInput());
  }, []);

  return (
    <div className="listDiv">
      <div className="productList">
        <div className="header">
          <h1>Search!</h1>
          <form>
            <input
              value={filter}
              className="input"
              onChange={changeFilter}
              onKeyUp={(e) => searchProducts(e, filter)}
            />
          </form>
        </div>
        <div>
          <ul>
            {products.length > 0 ? (
              products.map((product) => {
                return (
                  <div key={product.id}>
                    <Link
                      to={`/selectedProduct/${product.id}`}
                      key={product.id}
                      onClick={(e) => setCurProduct(e, product.id)}
                    >
                      {product.name} (${product.price})
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>Sorry! No products available under that name!</p>
            )}
          </ul>
        </div>
        <Pagination
          count={Math.ceil(productsCount / 5)}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          onChange={(e, value) => handlePage(e, value, filter)}
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
};

const mapState = ({products, count, input}) => {
  const {productsCount} = count;
  const {page, filter} = input;

  return {
    products,
    page,
    filter,
    productsCount,
  };
};

const mapDispatch = (dispatch) => {
  const changeFilter = (e) => {
    dispatch(updateInput("filter", e.target.value));
  };

  const handlePage = (e, value, filter) => {
    e.preventDefault();
    dispatch(updateInput("page", value));
    dispatch(fetchProducts(filter, value));
  };

  const searchProducts = (e, filter) => {
    dispatch(fetchProducts(filter));
  };
  const setCurProduct = async (e, id) => {
    dispatch(fetchSelectedProduct(id));
  };
  return {
    dispatch,
    handlePage,
    changeFilter,
    searchProducts,
    setCurProduct,
  };
};

export default connect(mapState, mapDispatch)(SearchList);
