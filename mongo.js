const mongoose = require('mongoose')


if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
const password = process.argv[2]


// console.log(password)
const url = `mongodb+srv://dipanshuxxxl:${password}@phonebook.16qriae.mongodb.net/ContactList?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => console.log("success")).catch(error => console.log("failure"))
  
const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

if (process.argv.length > 3 && process.argv.length < 6){
    const setName = process.argv[3]
    const setNumber = process.argv[4]
    if (process.argv[4] === !null){
        const contact = new PhoneBook({
            name: setName,
            number: setNumber,
        })    
        contact.save().then(result => {
            console.log(`added ${setName} number ${setNumber} to phonebook`)
            mongoose.connection.close()
        }).catch(error => console.log('not added'))
    }
    console.log(` number not entered `)
    mongoose.connection.close()
}
else {
    PhoneBook.find({}).then(result => {
        console.log(`phonebook: `)    
        result.forEach(contact => {
          console.log(contact.name + " " + contact.number)

        })
        console.log(result.length)
        mongoose.connection.close()
    })
}

