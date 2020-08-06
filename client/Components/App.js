/* eslint-disable react/no-unescaped-entities */
import React, {useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {
  fetchCategories,
  fetchProducts,
  fetchUser,
  updateForm,
  fetchSessionOrder,
  updateOrder,
  fetchCart,
} from "../store/actions";
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
import SearchList from "./SearchList";
import Checkout from "./Checkout";

const App = ({loggedIn, dispatch, user}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchProducts());
      const sessionOrder = await dispatch(fetchSessionOrder());
      if (!loggedIn) {
        const [res, activeOrders] = await dispatch(fetchUser());
        if (res) {
          await dispatch(updateForm("loggedIn", true));
          if (activeOrders && activeOrders.length) {
            await dispatch(fetchCart(activeOrders.id));
          }
          if (!sessionOrder.userId && !activeOrders.length) {
            await dispatch(updateOrder(sessionOrder.id, res.id));
          }
        }
      }
    };
    getData();
  }, []);

  return (
    <div className="maindiv">
      <Nav />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/magic/:id" component={SpellPage} />
        <Route path="/items/:id" component={ItemPage} />
        <Route path="/weapons/:id" component={WeaponPage} />
        <Route path="/armor/:id" component={ArmorPage} />
        <Route path="/weapons" component={WeaponsList} />
        <Route path="/armor" component={ArmorList} />
        <Route path="/magic" component={SpellList} />
        <Route path="/items" component={ItemList} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/search" component={SearchList} />
        <Route path="/checkout" component={Checkout} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({form, user, orders}) => {
  const {loggedIn} = form;
  const {activeOrders} = orders;
  return {
    user,
    activeOrders,
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
