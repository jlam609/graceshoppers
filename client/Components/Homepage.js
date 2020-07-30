import React from 'react';

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
                <img
                    className='book'
                    src='./Blue_Book.png'>
                </img>
                <img
                    className='book'
                    src='./Red_Book.png'>
                </img>
                <img
                    className='book'
                    src='./Purple_Book.png'>
                </img>
                <img
                    className='book'
                    src='./Green_Book.png'>
                </img>
            </div>
            <img
                    className='table'
                    src='./Table.png'>
                </img>
        </div>
    )
}

export default HomePage;