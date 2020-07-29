import React from 'react';
import { connect } from 'react-redux';
import store from '../store/index.js'

const WeaponPage = ({match, products}) => {
    
    const weapon = products.filter(product => product.id === match.params.id);
    const myWeapon = weapon[0];
   
    console.log(myWeapon);
    if(weapon.length) {
    return <div> 
        <h2>{myWeapon.name} ({myWeapon.price})</h2>
        <p>{myWeapon.description}</p>
        <img src={myWeapon.image}></img>
       </div>
    } else {
        return <h2>WeaponLoading</h2>
    }
}
const mapStateToProps = (state) => ({
    products: state.products,
})

export default connect(mapStateToProps)(WeaponPage);