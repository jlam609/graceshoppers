import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Route, Switch, Redirect} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {updateInput, fetchProducts} from "../store/actions";

const WeaponsList = ({products, handleChange, page, weaponsCount}) => {
  if (products.length) {
    const weapons = products.filter((weapon) => weapon.categoryId === 1);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [prodPerPage, setProdPerPage] = useState(5);
    // const indexOfLastProd = currentPage * prodPerPage;
    // const indexOfFirstProd = indexOfLastProd - prodPerPage;
    // const currentProds = weapons.slice(indexOfFirstProd, indexOfLastProd);
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div className="productList">
        <div className="header">
          <h1>Weapons</h1>
        </div>
        <div>
          <ul>
            {weapons.map((weapon) => {
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
          count={Math.ceil(weaponsCount / 10)}
          page={page}
          onChange={handleChange}
        />
      </div>
    );
  }
  return <h1>Weapons Loading...</h1>;
};

const mapState = ({products, count, input}) => {
  const {weaponsCount} = count;
  const {page, product, filter} = input;
  console.log(input)
  return {
    products,
    page,
    weaponsCount,
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
    handleChange,
  };
};
export default connect(mapState, mapDispatch)(WeaponsList);
