import React from 'react';
import { connect } from 'react-redux';
import store from '../store/index.js'

const SpellPage = ({match, products}) => {
    
    const spell = products.filter(product => product.id === match.params.id);
    const mySpell = spell[0];
    if(spell.length) {
    return <div> 
        <h2>{mySpell.name} ({mySpell.price})</h2>
        <p>{mySpell.description}</p>
        <img src={mySpell.image}></img>
       </div>
    } else {
        return <h2>Spell Loading</h2>
    }
}
const mapStateToProps = (state) => ({
    products: state.products,
})

export default connect(mapStateToProps)(SpellPage);