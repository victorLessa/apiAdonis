'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeacherClassRoomsSchema extends Schema {
  up () {
    this.create('teacher_class_rooms', (table) => {
      table.integer('teacher_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('teachers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('class_room_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('class_rooms')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('teacher_class_rooms')
  }
}

module.exports = TeacherClassRoomsSchema
