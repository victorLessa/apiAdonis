'use strict'
const Database = use('Database')
const Hash = use('Hash')
class Student {
  async registerStudent(request) {
    await Database.transaction(async (trx) => {
      let { user_address } = request.all()
      await trx.insert(user_address).into('users_addresses')
        .then(async (trxUserAddress) => {
          let { user } = request.all()
          user.user_address_id = trxUserAddress
          user.password = await Hash.make(user.password)
          await trx.insert(user).into('users')
            .then(async (trxUser) => {
              await trx.insert({ user_id: trxUser, role_id: 3}).into('role_users')
                .then(async (trxRole) => {
                  let { student_detials } = request.all()
                  student_detials.user_id = trxUser
                  await trx.insert(student_detials).into('students')
                })
            })
        })
    })
  }
}

module.exports = Student