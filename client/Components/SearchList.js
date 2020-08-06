import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {fetchProducts, clearInput, updateInput} from "../store/actions";

const SearchList = ({
  searchProducts,
  dispatch,
  products,
  filter,
  changeFilter,
  handlePage,
  page,
  productsCount,
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
          {products.map((product) => {
            let searchname;
            if (product.categoryId === 1) {
              searchname = "weapons";
            } else if (product.categoryId === 2) {
              searchname = "armor";
            } else if (product.categoryId === 3) {
              searchname = "spells";
            } else {
              searchname = "items";
            }
            return (
              <div key={product.id}>
                <Link to={`/${searchname}/${product.id}`} key={product.id}>
                  {product.name} ({product.price})
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
        onChange={(e, value) => handlePage(e, value, filter)}
      />
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

  return {
    dispatch,
    handlePage,
    changeFilter,
    searchProducts,
  };
};

export default connect(mapState, mapDispatch)(SearchList);
