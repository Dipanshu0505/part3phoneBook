const mongoose = require('mongoose')
require('dotenv').config()

MONGODB_URI = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(MONGODB_URI).then(result => console.log("success")).catch(error => console.log("failure"))

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

phoneBookSchema.set('toJSON', {
  transform: (doucment, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

module.exports = PhoneBook