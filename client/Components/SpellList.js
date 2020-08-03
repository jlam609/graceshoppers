import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import SpellPage from "./SpellPage";
import Pagination from "./Pagination";

const SpellList = ({products}) => {
  if (products.length) {
    const spells = products.filter((spell) => spell.categoryId === 3);
    const [currentPage, setCurrentPage] = useState(1);
    const [prodPerPage, setProdPerPage] = useState(5);
    const indexOfLastProd = currentPage * prodPerPage;
    const indexOfFirstProd = indexOfLastProd - prodPerPage;
    const currentProds = spells.slice(indexOfFirstProd, indexOfLastProd);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div className="productList">
        <h1 className="header">Magic</h1>
        <div>
          <ul>
            {spells.map((spell) => {
              return (
                <div key={spell.id}>
                  <Link to={`/magic/${spell.id}`} key={spell.id}>
                    {spell.name}
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <Pagination
          prodPerPage={prodPerPage}
          totalProds={spells.length}
          paginate={paginate}
        />
      </div>
    );
  }
  return <h1>Spells Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(SpellList);
