'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Users = use('App/Models/User')
const Students = use('App/Models/Student')
const Teachers = use('App/Models/Teacher')
const ClassUser = use('App/Models/ClassUser')
const Class = use('App/Models/Class')
const CustomException = use('App/Exceptions/CustomException')
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
                            .insert({ user_id: trxUser, course_id: trxCourse })
                        })
                    })
                })
            })
        })
    })
  }

  async getDetailsTeacher(user, password, email, auth) {
    let details = await Database
    .select().from('users')
    .leftJoin('users_addresses', 'users.user_address_id', 'users_addresses.id')
    .leftJoin('teachers', 'teachers.user_id', 'users.id')
    .where(
      'users.id', user.id
    ).first(
      'users.first_name',
      'users.last_name',
      'users.user_address_id',
      'users.email',
      'teachers.age',
      'teachers.birthday',
      'teachers.cpf',
      'users_addresses.label',
      'users_addresses.street',
      'users_addresses.number',
      'users_addresses.district',
      'users_addresses.city',
      'users_addresses.state',
      'users_addresses.cep'
    )
    let classes = await Class.query().with('classes', obj => obj.where('user_id', user.id)).fetch()
    let classes_rooms = []
    classes = classes.toJSON()
    for (let i = 0; i < classes.length; i++) {
      classes_rooms.push(classes[i].name)
    }
    const jwtPayload = { id: user.id, email: user.email, role: user.role_id }
    const token = await auth.attempt(email, password, jwtPayload)
    details.token = token.token
    details.permission = 'Teacher'
    details.isAdmin = false
    details.classes_rooms = classes_rooms
    return details
  }

  async getDetailsStudent(user, password, email, auth) {
    let details = await Database
    .select().from('users')
    .leftJoin('users_addresses', 'users.user_address_id', 'users_addresses.id')
    .leftJoin('students', 'students.user_id', 'users.id')
    .leftJoin('class_users', 'class_users.user_id', 'users.id')
    .leftJoin('classes', 'classes.id', 'class_users.class_id')
    .where(
      'users.id', user.id
    ).first(
      'users.first_name',
      'users.last_name',
      'users.user_address_id',
      'users.email',
      'students.age',
      'users.id',
      'students.birthday',
      'students.cpf',
      'classes.name as className',
      'classes.name as className2',
      'users_addresses.label',
      'users_addresses.street',
      'users_addresses.number',
      'users_addresses.district',
      'users_addresses.city',
      'users_addresses.state',
      'users_addresses.cep'
    )
    let classes = await Class.query().with('classes', obj => obj.where('user_id', user.id)).fetch()
    let classes_rooms = []
    classes = classes.toJSON()
    for (let i = 0; i < classes.length; i++) {
      classes_rooms.push(classes[i].name)
    }
    const jwtPayload = { id: user.id, email: user.email, role: user.role_id }
    const token = await auth.attempt(email, password, jwtPayload)
    details.token = token.token
    details.permission = 'Student'
    details.isAdmin = false
    details.classes_rooms = classes_rooms
    return details
  }

  async getDetailsAdmin(user, password, email, auth) {
    const jwtPayload = { id: user.id, email: user.email, role: user.role_id }
    const token = await auth.attempt(email, password, jwtPayload)
    let obj = {isAdmin: true, permission: 'Manager', ...token}
    return obj
  }

  async authenticate(request, response, auth) {
    try {
      const { email, password } = request.all()
      let user = await Database
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
        if (!user) {
          throw new CustomException().handle('Email invalido', response, 500)
        }
      const isPass = await Hash.verify(password, user.password)
      if (isPass) {
        if (user.role_id === 3) {
          return this.getDetailsStudent(user, password, email, auth)
        } else if (user.role_id === 2) {
          return this.getDetailsTeacher(user, password, email, auth)
        } else if (user.role_id === 1) {
          return this.getDetailsAdmin(user, password, email, auth)
        }
      } else {
        throw new CustomException().handle('Senha invalida', response, 500)
      }
    } catch (error) {
    }
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
              await trx.insert({ user_id: trxUser, role_id: 3 }).into('role_users')
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