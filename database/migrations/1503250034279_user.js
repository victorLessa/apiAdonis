'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('user_address_id', 80)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users_addresses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('first_name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('age', 60)
      table.bigint('cpf', 12).unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
