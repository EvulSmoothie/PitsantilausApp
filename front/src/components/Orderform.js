import React from 'react'

//Tilaus lomakkeen renderöinti, kentät nimelle ja osoitteelle sekä nappi tilauksen lähettämiseksi
const Orderform = (props) => {
    return(
        <form onSubmit={props.sendOrder}>
            <div>
                Name: <input value={props.name} onChange={props.handleNameInput}/>
            </div>
            <div>
                Address: <input value={props.address} onChange={props.handleAddressInput}/>
            </div>
            <div>
                <button type="submit">Send Order</button>
            </div>
        </form>
    )
}
export default Orderform