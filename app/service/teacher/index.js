'use strict'
const Database = use('Database')
const Hash = use('Hash')
class Teacher {
  async registerTeacher(request) {
    await Database.transaction(async (trx) => {
      let { user_address } = request.all()
      await trx.insert(user_address).into('users_addresses')
        .then(async (trxUserAddress) => {
          let { user } = request.all()
          user.user_address_id = trxUserAddress
          user.password = await Hash.make(user.password)
          await trx.insert(user).into('users')
            .then(async (trxUser) => {
              await trx.insert({ user_id: trxUser, role_id: 2}).into('role_users')
                .then(async (trxRole) => {
                  let { teacher_detials } = request.all()
                  teacher_detials.user_id = trxUser
                  await trx.insert(teacher_detials).into('teachers')
                })
            })
        })
    })
  }
}

module.exports = Teacher