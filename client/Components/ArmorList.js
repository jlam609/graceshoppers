import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import store from '../store/index.js'
import ArmorPage from './ArmorPage.js'

class ArmorList extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {products} = this.props;
        console.log(products);
        const armors = products.filter(armor => armor.categoryId === 2)
        return(
            <div>
            <h1>Armor</h1>
            <div>
            <ul>{armors.map(armor => {
                return <div>
                    <Link to={`/armor/${armor.id}`} key={armor.id}>{armor.name}</Link>
                </div>
            })}
                </ul>
                <Route path ='/armor/:id' component = {ArmorPage} render={({ match }) => { return {match} }}/>
            </div>
            </div>
        )
    }
}

const mapStateToProps = ({ products }) => ({ products })

export default connect(mapStateToProps)(ArmorList);