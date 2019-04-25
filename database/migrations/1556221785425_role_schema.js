'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('name', 125).notNullable()
      table.string('description', 125).notNullable()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RoleSchema
