import React from 'react'
import ReactDom from 'react-dom'

const App = document.getElementById('app')

ReactDom.render(
    <h1>GraceShoppers</h1>,
    App,
    () => console.log('rendered')
)