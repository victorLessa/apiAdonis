'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentsSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('age', 60)
      table.date('birthday')
      table.bigint('cpf', 12).unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentsSchema
