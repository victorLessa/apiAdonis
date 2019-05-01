'use strict'

/*
|--------------------------------------------------------------------------
| MatterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
class MatterSeeder {
  async run () {
    let roles = [
      {name: 'Portugues'},
      {name: 'Matematica'},
      {name: 'Biologia'},
      {name: 'Geografia'},
      {name: 'Historia'},
      {name: 'Sociologia'},
      {name: 'Filosofia'},
      {name: 'Fisica'},
      {name: 'Quimica'}
    ]
    await Database.from('matters').insert(roles)
  }
}

module.exports = MatterSeeder
