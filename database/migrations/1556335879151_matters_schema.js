'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MattersSchema extends Schema {
  up () {
    this.create('matters', (table) => {
      table.increments()
      table.string('name', 124).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('matters')
  }
}

module.exports = MattersSchema
