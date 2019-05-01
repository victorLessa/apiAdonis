'use strict'

/*
|--------------------------------------------------------------------------
| ProfessionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
class ProfessionSeeder {
  async run () {
    const professions = [
      {name: 'Admin'},
      {name: 'Aluno'},
      {name: 'Professor'}
    ]
    await Database.from('professions').insert(professions)
  }
}

module.exports = ProfessionSeeder
