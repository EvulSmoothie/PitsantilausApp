//Mongoose spesifi koodi, tilauksia varten
const mongoose = require('mongoose')


const url = process.env.MONGODB_URI
//Yhdistetään tietokantaan, ilmoitetaan virheestä tai onnistuneesta yhdistyksestä
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
//Luodaan skeema
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  order: [],
})

//Muokataan mongolta saadut oliot järkevään tulostus muotoon, eli poistetaan siitä mongon käyttämä ID sekä versio
orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  //Exportataan malli
module.exports = mongoose.model('Order', orderSchema)