'use strict'

const Database = use('Database')
const Hash = use('Hash')
class Admin {
  async register(request) {
    await Database.transaction(async (trx) => {
      let { user_address } = request.all()
      await trx.insert(user_address)
        .into('users_addresses')
        .then(async (trxAddress) => {
          let { user } = request.all()
          user.password = await Hash.make(user.password)
          user.user_address_id = trxAddress[0]
          await trx.insert(user).into('users')
            .then(async (trxUser) => {
              await trx.insert({ user_id: trxUser, role_id: 1 })
                .into('role_users')
                .then(async (trxRole) => {
                  const { course_address } = request.all()
                  await trx.into('courses_addresses').insert(course_address)
                    .then(async (trxAddressCourse) => {
                      const { course } = request.all()
                      course.course_address_id = trxAddressCourse
                      await trx.into('courses').insert(course)
                        .then(async (trxCourse) => {
                          await trx.into('course_user_details')
                            .insert({ user_id: trxUser, course_id: trxCourse})
                        })
                    })
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

module.exports = Admin