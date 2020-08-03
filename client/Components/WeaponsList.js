import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Route, Switch, Redirect} from "react-router-dom";
import Pagination from "./Pagination";

const WeaponsList = ({products, match}) => {
  if (products.length) {
    const weapons = products.filter((weapon) => weapon.categoryId === 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [prodPerPage, setProdPerPage] = useState(5);
    const indexOfLastProd = currentPage * prodPerPage;
    const indexOfFirstProd = indexOfLastProd - prodPerPage;
    const currentProds = weapons.slice(indexOfFirstProd, indexOfLastProd);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div className="productList">
        <div className="header">
          <h1>Weapons</h1>
        </div>
        <div>
          <ul>
            {currentProds.map((weapon) => {
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
          prodPerPage={prodPerPage}
          totalProds={weapons.length}
          paginate={paginate}
        />
      </div>
    );
  }
  return <h1>Weapons Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(WeaponsList);
