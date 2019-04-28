'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeachersSchema extends Schema {
  up () {
    this.create('teachers', (table) => {
      table.increments()
      table.string('first_name', 80).notNullable()
      table.integer('user_address_id', 80)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users_addresses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('last_name', 80).notNullable()
      table.integer('age', 10)
      table.string('email', 124).notNullable()
      table.string('password', 124).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('teachers')
  }
}

module.exports = TeachersSchema
