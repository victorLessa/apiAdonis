'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('role_users', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('role_id')
        .notNullable()
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('roles_users')
  }
}

module.exports = RoleSchema
