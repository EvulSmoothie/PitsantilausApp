//Mongoose spesifi koodi, menua varten
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

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
const menuSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
})

//Muokataan mongolta saadut oliot järkevään tulostus muotoon, eli poistetaan siitä mongon käyttämä ID sekä versio
menuSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  //Exportataan malli
module.exports = mongoose.model('Pizza', menuSchema)