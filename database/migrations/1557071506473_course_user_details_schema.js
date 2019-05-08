'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseUserDetailsSchema extends Schema {
  up () {
    this.create('course_user_details', (table) => {
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('course_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('course_user_details')
  }
}

module.exports = CourseUserDetailsSchema
