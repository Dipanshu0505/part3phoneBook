const mongoose = require('mongoose')
require('dotenv').config()

MONGODB_URI = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(MONGODB_URI).then(result => console.log("success")).catch(error => console.log("failure"))

const phoneBookSchema = new mongoose.Schema({
    name: {
      type: String, 
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(?:\d{2,3}-\d{6,}|[1-9]\D{7,})$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required']
    }
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