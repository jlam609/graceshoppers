import React from 'react';
import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <div
            className='home'
        >
            <img
                    className='shopKeep'
                    src='./Shopkeep_Outline.png'>
                </img>
            <div
                className='bookContainer'>
                <div>
                <img
                    className='book'
                    src='./Blue_Book.png'>
                </img>
                <Link to = '/weapons'>Weapons</Link>
                </div>
                <div>
                <img
                    className='book'
                    src='./Red_Book.png'>
                </img>
                <Link to ='/armor'>Armor</Link>
                </div>
                <div>
                <img
                    className='book'
                    src='./Purple_Book.png'>
                </img>
                <Link to ='/magic'>Magic</Link>
                </div>
                <div>
                <img
                    className='book'
                    src='./Green_Book.png'>
                </img>
                <Link to ='/items'>Items</Link>
                </div>
            </div>
            <div>
            <img
                    className='table'
                    src='./Table.png'>
                </img>
                <Link to='/cart'>Cart</Link>
                </div>
        </div>
    )
}

export default HomePage;