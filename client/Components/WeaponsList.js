import React from "react";
import {connect} from "react-redux";
import {Link, Route, Switch, Redirect} from "react-router-dom";
import WeaponPage from "./WeaponPage";

const WeaponsList = ({products, match}) => {
  if (products.length) {
    const weapons = products.filter((weapon) => weapon.categoryId === 1);
    return (
      <div className="productList">
        <div className="header">
          <h1>Weapons</h1>
        </div>
        <div>
          <ul>
            {weapons.map((weapon) => {
              return (
                <div>
                  <Link to={`/weapons/${weapon.id}`} key={weapon.id}>
                    {weapon.name} ({weapon.price})
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return <h1>Weapons Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(WeaponsList);
