import React, {Component, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchCategories, fetchProducts} from '../store/actions.js'
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

class App extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        await this.props.fetchProducts();
        await this.props.fetchCategories();
    }
    render() {
    return(
        <div>
        <h1>Tack's RNGeneral Store</h1>
        <Nav/>
        <Switch>
            <Route>
             <Route path='/weapons' component = {WeaponsList}/> 
             <Route path='/armor' component = {ArmorList}/>
             <Route path='/magic' component = {SpellList} />
             <Route path='/items' component = {ItemList} />
            </Route>
            <Route path='/home' component={ HomePage }></Route>
            <Redirect to='/home'/>
        </Switch>
        </div>
    )
}
}
// const mapState = (state) => {
//     console.log(state)
//     return{
//         state
//     }
// }

const mapStateToProps = (state) => {
    return {
      products: state.products,
      categories: state.categories,
    }
  }

const mapDispatchToProps = (dispatch)=> {
    return {
      fetchProducts: ()=> {
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
