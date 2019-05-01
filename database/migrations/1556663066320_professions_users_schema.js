'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessionsUsersSchema extends Schema {
  up () {
    this.create('professions_users', (table) => {
      table.integer('user_id').notNullable()
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('professions_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('professions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('professions_users')
  }
}

module.exports = ProfessionsUsersSchema
