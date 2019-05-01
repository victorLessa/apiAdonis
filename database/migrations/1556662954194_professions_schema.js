'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessionsSchema extends Schema {
  up () {
    this.create('professions', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('professions')
  }
}

module.exports = ProfessionsSchema
