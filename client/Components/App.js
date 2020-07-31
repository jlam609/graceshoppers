<<<<<<< HEAD
import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCategories, fetchProducts } from '../store/actions.js'
import WeaponsList from './WeaponsList.js'
import ArmorList from './ArmorList.js'
import SpellList from './SpellList.js'
import ItemList from './ItemList.js'
import Nav from './Nav'
import HomePage from './Homepage'

// const App = ({dispatch}) => {
//     useEffect(() => {
//         const getData = async() => {
//             await dispatch(fetchProducts())
//             await dispatch(fetchCategories())
//         }
//         getData()
//     },[])
=======
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
>>>>>>> master

class App extends Component {
  async componentDidMount() {
    await this.props.fetchProducts();
    await this.props.fetchCategories();
  }

<<<<<<< HEAD
    async componentDidMount() {
        await this.props.fetchProducts();
        await this.props.fetchCategories();
    }
    render() {
        return (
            <div
                className='maindiv'>
                {Nav()}
                <Switch>
                    <Route path='/weapons' component={WeaponsList} />
                    <Route path='/armor' component={ArmorList} />
                    <Route path='/magic' component={SpellList} />
                    <Route path='/items' component={ItemList} />
                    <Route path='/home' component={HomePage}></Route>
                    <Redirect to='/home' />
                </Switch>
            </div>
        )
    }
=======
  render() {
    return (
      <div>
        <h1>Tack's RNGeneral Store</h1>
        <Nav />
        <Switch>
<<<<<<< HEAD
             <Route path='/weapons' component = {WeaponsList}/> 
             <Route path='/armor' component = {ArmorList}/>
             <Route path='/magic' component = {SpellList} />
             <Route path='/items' component = {ItemList} />
            <Route path='/home' component={ HomePage }></Route>
            <Redirect to='/home'/>
=======
          <Route path="/weapons" component={WeaponsList} />
          <Route path="/armor" component={ArmorList} />
          <Route path="/magic" component={SpellList} />
          <Route path="/items" component={ItemList} />
          <Route path="/home" component={HomePage} />
          <Redirect to="/home" />
>>>>>>> dd167a5c3bfa814ff622d08a2e3a2f198a11fa23
        </Switch>
      </div>
    );
  }
>>>>>>> master
}

const mapStateToProps = (state) => {
<<<<<<< HEAD
    return {
        products: state.products,
        categories: state.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => {
            dispatch(fetchProducts())
        },
        fetchCategories: () => {
            dispatch(fetchCategories())
        }
    };
};
// const mapDispatch = (dispatch) => {
//     return{
//         dispatch
//     }
// }
export default connect(mapStateToProps, mapDispatchToProps)(App)
=======
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
>>>>>>> master
