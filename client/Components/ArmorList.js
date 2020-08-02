import React from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import ArmorPage from "./ArmorPage";

const ArmorList = ({products}) => {
  if (products.length) {
    const armors = products.filter((armor) => armor.categoryId === 2);
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
      </div>
    );
  }
  return <h1>Armor Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(ArmorList);
