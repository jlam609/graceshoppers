import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import Pagination from "./Pagination";

const ArmorList = ({products}) => {
  if (products.length) {
    const armors = products.filter((armor) => armor.categoryId === 2);
    const [currentPage, setCurrentPage] = useState(1);
    const [prodPerPage, setProdPerPage] = useState(5);
    const indexOfLastProd = currentPage * prodPerPage;
    const indexOfFirstProd = indexOfLastProd - prodPerPage;
    const currentProds = armors.slice(indexOfFirstProd, indexOfLastProd);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div className="productList">
        <h1 className="header">Armor</h1>
        <div>
          <ul>
            {armors.map((armor) => {
              return (
                <div key={armor.id}>
                  <Link to={`/armor/${armor.id}`} key={armor.id}>
                    {armor.name}
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <Pagination
          prodPerPage={prodPerPage}
          totalProds={armors.length}
          paginate={paginate}
        />
      </div>
    );
  }
  return <h1>Armor Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(ArmorList);
