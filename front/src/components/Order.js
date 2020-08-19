import React from 'react'

//yksittäisen tilauksen tietojen renderöinti
const Order = ({order, deleteOrder}) => {
    //Otetaan tilauksesta sen nimi ja osoite, sen jälkeen listataan siinä olevat pizzat
    return(
        <div>
            <li>
                {order.name}, {order.address}: 
                {order.order.map((pizza, i)=> <ul key={i}>{pizza}</ul>)} 
                <button onClick={deleteOrder}>Delete from database</button> </li>
            ----------------------------------------------------------
        </div>
    )
}

export default Order