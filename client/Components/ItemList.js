import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
// import Pagination from "./Pagination";

const ItemList = ({products}) => {
  if (products.length) {
    const items = products.filter((item) => item.categoryId === 4);
    const [currentPage, setCurrentPage] = useState(1);
    const [prodPerPage, setProdPerPage] = useState(5);
    const indexOfLastProd = currentPage * prodPerPage;
    const indexOfFirstProd = indexOfLastProd - prodPerPage;
    const currentProds = items.slice(indexOfFirstProd, indexOfLastProd);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div className="productList">
        <h1 className="header">Items</h1>
        <div>
          <ul>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <Link to={`/items/${item.id}`} key={item.id}>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        {/* <Pagination
          prodPerPage={prodPerPage}
          totalProds={items.length}
          paginate={paginate}
        /> */}
      </div>
    );
  }
  return <h1>Items Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(ItemList);
