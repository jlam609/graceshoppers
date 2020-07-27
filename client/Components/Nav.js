import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <nav >
            <Link to = '/home'>Home</Link>
            <Link to = '/weapons'>Weapons</Link>
            <Link to ='/armor'>Armor</Link>
            <Link to ='/magic'>Magic</Link>
            <Link to ='/items'>Items</Link>
            <Link to ='/cart'>Cart</Link>
        </nav>
    )
}

export default Nav;