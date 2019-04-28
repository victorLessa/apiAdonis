'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
class RoleSeeder {
  async run () {
    let roles = [
      {name: 'Admin', description: 'Administrador'},
      {name: 'Teacher', description: 'Administrador'},
      {name: 'Student', description: 'Administrador'}
    ]
    await Database.from('roles').insert(roles)
  }
}

module.exports = RoleSeeder
