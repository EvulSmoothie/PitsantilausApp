import React from 'react'

//yksittäisen pitsan renderöinti meneillään olevan tilauksen listaukseen, myös nappi sen poistamiseen
const Tilaus = ({pizza, removeOrder}) => {
    return(
    <li>{pizza.name}: {pizza.ingredients} <button onClick={removeOrder}>X</button></li>
    )
}

export default Tilaus