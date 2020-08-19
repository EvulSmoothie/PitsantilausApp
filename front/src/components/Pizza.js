import React from 'react'

//yksittäisen pitsan tietojen renderöinti, ja nappi sen lisäämiseksi tilaukseen
const Pizza = ({pizza, putOrder}) => {
    return(
    <li>{pizza.name}: {pizza.ingredients} <button onClick={putOrder}>Add to order</button> </li>
    )
}

export default Pizza