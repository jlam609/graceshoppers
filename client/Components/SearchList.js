import React from "react";
import {connect} from "react-redux";
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {updateForm} from "../store/actions";

const SearchList = ({products, filter, handleChange}) => {
  if (products.length) {
    return (
      <div className="productList">
        <div className="header">
          <h1>Search!</h1>
          <form>
            <input className="input" onChange={handleChange}></input>
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
      </div>
    );
  }
  return <h1>Products Loading...</h1>;
};

const mapState = ({products, filter}) => ({products, filter});

const mapDispatch = (dispatch) => {
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(updateForm("filter", e.target.value));
  };

  return {handleChange};
};

export default connect(mapState, mapDispatch)(SearchList);
