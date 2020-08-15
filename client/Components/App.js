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
import SelectedProduct from "./SelectedProduct";
import SearchList from "./SearchList";
import Admin from "./Admin";
import Checkout from "./Checkout";
import RegisterAdmin from "./RegisterAdmin";
import isLoading from "./Loading";
import User from "./User";

const LoaderSelectedProduct = isLoading(SelectedProduct);

const App = ({loggedIn, dispatch, loading}) => {
  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchCategories());
      // await dispatch(fetchProducts());
      await dispatch(fetchUser());
      const sessionOrder = await dispatch(fetchSessionOrder());
      if (!loggedIn) {
        const [res, activeOrders] = await dispatch(fetchUser());
        if (res) {
          await dispatch(updateForm("loggedIn", true));
          if (activeOrders) {
            await dispatch(fetchCart(activeOrders.id));
          }
          if (!sessionOrder.userId && !activeOrders) {
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
        <Route
          path="/selectedProduct/:id"
          render={(props) => <LoaderSelectedProduct loading={loading} {...props} />}
        />
        <Route path="/weapons" component={WeaponsList} />
        <Route path="/armors" component={ArmorList} />
        <Route path="/magic" component={SpellList} />
        <Route path="/items" component={ItemList} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/user" component={User} />
        <Route exact path="/registerAdmin" component={RegisterAdmin} />
        <Route exact path="/register" component={Register} />
        <Route path="/search" component={SearchList} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/admin" component={Admin} />
        <Redirect to="/home" />
      </Switch>
      {/* <footer className="footer">
        Created by Jason Lam, Caroline Flanagan, and Jake Froehlich <br />
        in Partnership with Fullstack Academy LLC.
      </footer> */}
    </div>
  );
};

const mapStateToProps = ({form, user, orders, input}) => {
  const {loading} = input;
  const {loggedIn} = form;
  const {activeOrders} = orders;
  return {
    loading,
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
