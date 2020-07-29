import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import store from '../store/index.js'
import SpellPage from './SpellPage.js'

class SpellList extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {products} = this.props;
        console.log(products);
        const spells = products.filter(spell => spell.categoryId === 3)
        return(
            <div>
            <h1>Magic</h1>
            <div>
            <ul>{spells.map(spell => {
                return <div>
                    <Link to={`/magic/${spell.id}`} key={spell.id}>{spell.name}</Link>
                </div>
            })}
                </ul>
                <Route path ='/magic/:id' component = {SpellPage} render={({ match }) => { return {match} }}/>
            </div>
            </div>
        )
    }
}

const mapStateToProps = ({ products }) => ({ products })

export default connect(mapStateToProps)(SpellList);