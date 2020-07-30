import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import store from "../store/index";
import WeaponPage from "./WeaponPage";

class WeaponsList extends Component {
  render() {
    const {products} = this.props;
    const weapons = products.filter((weapon) => weapon.categoryId === 1);
    return (
      <div>
        <h1>Weapons</h1>
        <div>
          <ul>
            {weapons.map((weapon) => {
              return (
                <div>
                  <Link to={`/weapons/${weapon.id}`} key={weapon.id}>
                    {weapon.name}
                  </Link>
                </div>
              );
            })}
          </ul>
          <Route
            path="/weapons/:id"
            component={WeaponPage}
            render={({match}) => {
              return {match};
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({products}) => ({products});

export default connect(mapStateToProps)(WeaponsList);
