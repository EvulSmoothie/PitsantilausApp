const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(express.json()) 
app.use(express.static('build'))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const Pizza = require('./models/menu')
const Order = require('./models/order')
const { request, response } = require('express')

//Koko menun hakeminen, palauttaa kaikki pitsat
app.get('/api/menu', (request, response) => {
    Pizza.find({}).then(menu => {
      response.json(menu)
   })
})

//Lisäys pyyntö, lisätään uusi tilaus tietokantaan
app.post('/api/orders', (request, response) => {

    const body = request.body
    console.log(body)

    //Luodaan uusi tilaus saaduilla tiedoilla
    const order = new Order({
      name: body.name,
      address: body.address,
      order: body.order,
    })
    
    //Tallennetaan tilaus ja vastataan tallennetuilla tiedoilla
    order.save().then(savedNote => {
      response.json(savedNote)
    })
})

//Kaikkien tilauksien hakeminen
app.get('/api/orders', (request, response) => {
    Order.find({}).then(menu => {
    response.json(menu)
 })
})

//Tietyn tilauksen poisto IDn perusteella
app.delete('/api/orders/:id', (request, response) => {
  Order.findByIdAndRemove(request.params.id)
  .then(() => {
    response.status(204).end()
  })
})


//Kuunnellaan porttia
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})