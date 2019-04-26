'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersAddressSchema extends Schema {
  up () {
    this.create('users_addresses', (table) => {
      table.increments()
      table.string('label', 124)
      table.string('street', 80)
      table.integer('number', 80)
      table.string('district', 80)
      table.string('city', 80)
      table.string('state', 80)
      table.integer('cep', 8)
      table.timestamps()
    })
  }

  down () {
    this.drop('users_addresses')
  }
}

module.exports = UsersAddressSchema
