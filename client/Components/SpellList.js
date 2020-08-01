import React from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import SpellPage from "./SpellPage";

const SpellList = ({products}) => {
  if (products.length) {
    const spells = products.filter((spell) => spell.categoryId === 3);
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
      </div>
    );
  }
  return <h1>Spells Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(SpellList);
