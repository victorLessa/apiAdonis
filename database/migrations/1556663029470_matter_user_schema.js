'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatterUserSchema extends Schema {
  up () {
    this.create('matter_users', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('matter_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('matters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('matter_users')
  }
}

module.exports = MatterUserSchema
