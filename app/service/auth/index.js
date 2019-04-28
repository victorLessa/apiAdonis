'use strict'

const Database = use('Database')
const Hash = use('Hash')
class Admin {
  async register(request) {
    const data = request.only(['email', 'password', 'username'])
    // const trx = await Database.beginTransaction()
    // await UserAddress.create(request.only(['label', '']))
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
          let data = request.only(['email', 'password', 'username', 'age'])
          data.password = await Hash.make(data.password)
          data.user_address_id = trxAddress[0]
          await trx.insert(data).into('users')
            .then(async (trxUser) => {
              await trx.insert({ user_id: trxUser, role_id: 1 }).into('role_users')
                .then(async (trxRole) => {
                  await trx.table('users').select('*').where('id', trxUser)
                })
            })
        })
    })
  }

  async authenticate(request, auth) {
    const { email, password } = request.all()
    const user = await Database
      .select()
      .from('users')
      .leftJoin('role_users', 'users.id', 'role_users.user_id')
      .where({ email: email })
      .first(
        'users.id',
        'users.email',
        'users.password',
        'role_users.role_id'
      )
    const isPass = await Hash.verify(password, user.password)
    const jwtPayload = { id: user.id, email: user.email, role: user.role_id }
    const token = await auth.attempt(email, password, jwtPayload)
    return token
  }
}

module.exports = Admin