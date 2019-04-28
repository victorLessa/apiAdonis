'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeacherMatterSchema extends Schema {
  up () {
    this.create('teacher_matters', (table) => {
      table.integer('teacher_id')
      table.integer('matter_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('teacher_matters')
  }
}

module.exports = TeacherMatterSchema
