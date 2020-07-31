/* eslint-disable react/no-unescaped-entities */
import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCategories, fetchProducts} from "../store/actions";
import WeaponsList from "./WeaponsList";
import ArmorList from "./ArmorList";
import SpellList from "./SpellList";
import ItemList from "./ItemList";
import Nav from "./Nav";
import HomePage from "./Homepage";

class App extends Component {
  async componentDidMount() {
    await this.props.fetchProducts();
    await this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <h1>Tack's RNGeneral Store</h1>
        <Nav />
        <Switch>
          <Route path="/weapons" component={WeaponsList} />
          <Route path="/armor" component={ArmorList} />
          <Route path="/magic" component={SpellList} />
          <Route path="/items" component={ItemList} />
          <Route path="/home" component={HomePage} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
