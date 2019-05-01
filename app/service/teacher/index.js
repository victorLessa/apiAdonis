'use strict'
const Database = use('Database')
const Hash = use('Hash')
class Teacher {
    async registerTeacher (request) {
        await Database.transaction(async (trx) => {
            await trx.insert(request.only([
              'label',
              'street',
              'number',
              'district',
              'city',
              'state',
              'cep']))
              .into('users_addresses')
              .then(async (trxAddress) => {
                let data = request.only(['email', 'password', 'first_name', 'last_name', 'age'])
                data.password = await Hash.make(data.password)
                data.user_address_id = trxAddress[0]
                await trx.insert(data).into('users')
                  .then(async (trxUser) => {
                    await trx.insert({ user_id: trxUser, professions_id: 3 }).into('professions_users')
                    await trx.insert({ user_id: trxUser, role_id: 3 }).into('role_users')
                      .then(async (trxRole) => {
                        await trx.table('users').select('*').where('id', trxUser)
                      })
                  })
              })
          })
    }
}

module.exports = Teacher