const dao = require('./model/UserDAO')
const hashString = require("./utils/hashString").hashString
const validator = require('email-validator')
const inquirer = require('inquirer')
const MongoClient = require('mongodb').MongoClient;

inquirer.prompt([
  {
    type: 'input',
    name: 'dbname',
    message: 'Please insert a database name',
    default: 'coffee_table'
  },
  {
    type: 'input',
    name: 'db_url',
    message: 'Please insert the database URL',
    default: 'mongodb://localhost:27017/'
  },
  {
    type: 'input',
    name: 'username',
    message: 'Please insert your desired username',
    validate: (value) => value.length > 0 ? true : 'The username must be at least one character long!'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Please insert your email',
    validate: (value) => validator.validate(value) ? true : 'Please add a valid email!'
  },
  {
    type: 'input',
    name: 'first_name',
    message: 'Please insert your firstname',
    validate: (value) => dao.validateForename(value) > 0 ? true : 'Please add a valid firstname!'
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Please insert your lastname',
    validate: (value) => dao.validateSurname(value) > 0 ? true : 'Please add a valid lastname!'
  },
  {
    type: 'password',
    mask: true,
    name: 'password',
    message: 'Please insert your password \n ' +
      'Enter a password between 8 - 128 characters long.\n' +
      'Must contain uppercase, lowercase, numerical and special characters.',
    validate: (value) => dao.validatePassword(value) > 0 ? true : 'Please add a valid password!'
  }]
).then(answers => {
  MongoClient.connect(answers.db_url + answers.dbname , { useNewUrlParser: true, useUnifiedTopology: true } , (err, client) => {
    try {
      if (err) throw err
      let db = client.db(answers.dbname)
      db.createCollection('users').then(async collection => {
        console.log(`${answers.dbname} database created!`)
        console.log('users collection created!')
        const password = await hashString(answers.password)
        collection.insertOne({username: answers.username, email: answers.email, first_name: answers.first_name, last_name: answers.last_name, password, role: 'admin'})
          .then(() => {
            console.log('User inserted!')
            client.close()
          })
      })
    } catch(err) {
      console.log('An error occurred when creating or setting up the database')
      console.log(err)
    }
  })
})

