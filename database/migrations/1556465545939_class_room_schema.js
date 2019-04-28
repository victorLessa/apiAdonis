'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassRoomSchema extends Schema {
  up () {
    this.create('class_rooms', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('turno').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('class_rooms')
  }
}

module.exports = ClassRoomSchema
