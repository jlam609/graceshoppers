import React from "react";

const Pagination = ({prodPerPage, totalProds, paginate}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProds / prodPerPage); i += 1) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          console.log(number);
          return (
            <li key={number} className="pagenum">
              <button
                type="button"
                onClick={() => paginate(number)}
                href=""
                className="pagelink"
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
