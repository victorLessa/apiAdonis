'use strict'
const ClassUser = use('App/MOdels/ClassUser')
class ClassUserController {
  async store ({ request, response, auth}) {
    let data = request.all()
    if (auth.jwtPayload.data.role === 1) {
      const classUser = await ClassUser.create(data)
      return classUser
    }
    response.status(400).send({status: 'error', result: 'Token invalido'})
  }
}

module.exports = ClassUserController
