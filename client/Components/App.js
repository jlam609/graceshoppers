import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchCategories, fetchProducts} from '../store/actions.js'
import Nav from './Nav'
import HomePage from './Homepage'

const App = ({dispatch}) => {
    useEffect(() => {
        const getData = async() => {
            await dispatch(fetchProducts())
            await dispatch(fetchCategories())
        }
        getData()
    },[])
    return(
        <div>
        <h1>Tack's RNGeneral Store</h1>
        <Nav/>
        <Switch>
            <Route path='/home' component={ HomePage }></Route>
            <Redirect to='/home'/>
        </Switch>
        </div>
    )
}
const mapState = (state) => {
    console.log(state)
    return{
        state
    }
}
const mapDispatch = (dispatch) => {
    return{
        dispatch
    }
}
export default connect(mapState,mapDispatch)(App)