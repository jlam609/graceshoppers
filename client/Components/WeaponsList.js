import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import store from '../store/index.js'
import WeaponPage from './WeaponPage.js'

class WeaponsList extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {products} = this.props;
        console.log(products);
        const weapons = products.filter(weapon => weapon.categoryId === 1)
        return(
            <div>
            <h1>Weapons</h1>
            <div>
            <ul>{weapons.map(weapon => {
                return <div>
                    <Link to={`/weapons/${weapon.id}`} key={weapon.id}>{weapon.name}</Link>

                </div>
            })}
                </ul>
                <Route path ='/weapons/:id' component = {WeaponPage} render={({ match }) => { return {match} }}/>
            </div>
            </div>
        )
    }
}

const mapStateToProps = ({ products }) => ({ products })

export default connect(mapStateToProps)(WeaponsList);