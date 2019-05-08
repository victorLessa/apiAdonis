'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoursesSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.integer('course_address_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('courses_addresses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name', 255).notNullable()
      table.bigint('cnpj', 14).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('phone', 11).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CoursesSchema
