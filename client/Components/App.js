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
import Register from "./Register";
import Login from "./Login";
import Cart from "./Cart";
import WeaponPage from "./WeaponPage";
import SpellPage from "./SpellPage";
import ArmorPage from "./ArmorPage";
import ItemPage from "./ItemPage";

class App extends Component {
  async componentDidMount() {
    await this.props.fetchProducts();
    await this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route
            path="/weapons/:id"
            exact
            component={WeaponPage}
            render={({match}) => {
              return {match};
            }}
          />
          <Route path="/weapons" component={WeaponsList} />
          <Route
            exact
            path="/armor/:id"
            component={ArmorPage}
            render={({match}) => {
              return {match};
            }}
          />
          <Route path="/armor" component={ArmorList} />
          <Route
            path="/magic/:id"
            component={SpellPage}
            render={({match}) => {
              return {match};
            }}
          />
          <Route path="/magic" component={SpellList} />
          <Route
            path="/items/:id"
            component={ItemPage}
            render={({match}) => {
              return {match};
            }}
          />
          <Route path="/items" component={ItemList} />
          <Route path="/home" component={HomePage} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
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
