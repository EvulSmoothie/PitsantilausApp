import React, { useState, useEffect } from 'react'
import pizzaService from './services/pizzaservice'
import Pizza from './components/Pizza'
import Orderform from './components/Orderform'
import Tilaus from './components/Tilaus'
import Order from './components/Order'
import Notification from './components/Notification'



const App = () => {
  //Pohjustetaan useStatet tyhjiks
  const [menu, setMenu] = useState([])
  const [orders, setOrders] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [site, changeSite] = useState(true)
  const [db, setDb] = useState([])
  const [popMessage, setMessage] = useState(null)

  //Haetaan menu tietokannasta
  useEffect(() => {
    pizzaService
    .getAll()
      .then(response => {
        setMenu(response.data)
      })
  }, [])
  //Toiminnallisuus "Add to order"-napille jolla lisätään pitsoja tilaukseen.
  const putOrder = (pizza) => {
    setOrders(orders.concat(pizza))
  }
  //Toiminnallisuus tilauslistalla olevalle "X"-napille jolla poistetaan pitsoja käynnissä olevasta tilauksesta. Poistaa tällä hetkellä aina ensimmäisen löytyvän instanssin pitsasta.
  const removeOrder = (pizza) => {
    setOrders(orders.filter(function(blank,i, rep){
      return i !== rep.indexOf(pizza)
    }))
  }

  //Toiminnallisuus "Delete from database"-napille jolla poistetaan tietokannassa olevia tilauksia. 
  //Lähetetään delete pyyntö IDllä ja sen jälkeen ilmoitetaan poisto onnistuneeksi sekä päivitetään lista
  const deleteOrder = (order) => {
    pizzaService 
    .del(order.id)
    .then(response =>{
      pizzaService
      .getOrders()
      .then(response =>{
        setDb(response.data)
      })
      setMessage(
        'Order removed succesfully'
      )
      setTimeout(() =>{
        setMessage(null)
      }, 5000)
    })

  }
  //"Sivun" vaihto napin toiminnallisuus, muutetaan relevantti muutta trueksi tai falseksi riippuen siitä kumpi se oli.
  //Jos mennään tilauksien näyttämis sivulle niin haetaan tilaukset tietokannasta
  const buttonForSite = () => {
    if (site) {
      pizzaService
      .getOrders()
      .then(response =>{
        setDb(response.data)
      })
      changeSite(false)
    }
    else {
      changeSite(true)
    }
  }

//Toiminnallisuus "Send Order"-napille.
//Varmistetaan ensin että kaikki tarvittavat tiedot on ja sitten lähetään tilaus kaikkine tietoineen tietokantaan
//Lopuksi nollataan lomake
  const sendOrder =  (event) => {
    event.preventDefault()
    const lahetys = orders.map ((pizza) =>{
      return pizza.name
    })
    if(name ===""){
      setMessage(
        'Order must have a name'
      )
      setTimeout(() =>{
        setMessage(null)
      }, 5000)
    }

    else if(address===""){
      setMessage(
        'Order must have an address'
      )
      setTimeout(() =>{
        setMessage(null)
      }, 5000)
    }
    else if(orders.length===0){
      setMessage(
        'Order must have an pizzas'
      )
      setTimeout(() =>{
        setMessage(null)
      }, 5000)
    }
    else {
    const newOrder = {
      name: name,
      address: address,
      order: lahetys
    }
    console.log(newOrder)

    pizzaService.create(newOrder)
    .then(response =>{
      setName("")
      setAddress("")
      setOrders([])
      setMessage(
        'Order send succesfully'
      )
      setTimeout(() =>{
        setMessage(null)
      }, 5000)
    })
    }
  }
  //Hanlerit Name ja Address input kentille
  const handleNameInput = (event) => {
    setName(event.target.value)
  }
  const handleAddressInput = (event) => {
    setAddress(event.target.value)
  }
//Tilaukset listaavan "sivun" renderöinti
  const ordersSite = () => (
    <div>
      <h1>Orders</h1>
      <button onClick={buttonForSite}>Menu</button>
      <ul>
        {db.map((order, i) => 
          <Order key={i} order={order} deleteOrder={() => deleteOrder(order)}/>
        )}
      </ul>
    </div>
  )
//Menu "sivun" renderöinti
  const menuSite = () => (
    <div>
      <h1>Menu</h1>
      <button onClick={buttonForSite}>Orders</button>
      <ul>
        {menu.map((pizza, i)=>
          <Pizza key={i} pizza={pizza} putOrder={() => putOrder(pizza)}/>
        )}
      </ul>
      <h3>Your order</h3>
        <Orderform sendOrder={sendOrder} name={name} handleNameInput={handleNameInput} address={address} handleAddressInput={handleAddressInput} />
        <ul>
          {orders.map((pizza, i)=>
            <Tilaus key={i} pizza={pizza} removeOrder={() => removeOrder(pizza)}/>
          )}
        </ul>
    </div>
  )

//Appin renderöinti, katsotaan kumpi "sivu" halutaan näyttää ja sen mukaan kutsutaan sen renderöijää
  return (
    <div>
      <Notification message={popMessage} />
      {site ?
      menuSite() : ordersSite()
      }
    </div>
  );
}

export default App;
