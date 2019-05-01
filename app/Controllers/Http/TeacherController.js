'use strict'
const service = require('../../service/teacher')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use('App/Models/User')
const RoleUser = use('App/Models/RoleUser')
class ProfessorController {

    constructor () {
        this.serviceTeacher = new service()
    }

    async index ( { request, response, auth }) {
        const teachers = await RoleUser.query().with('user').where('role_id', 3).fetch()
        return teachers
    }

    async show ({ params }) {
        const teacher = await Role
        return teacher
    }

    async registerTeacher ({ request, response, auth }) {
        if (auth.jwtPayload.data.role === 1) {
            await this.serviceTeacher.registerTeacher(request)
            return 'Professor cadastrado com sucesso'
        } else {
            response.status(401).send('Usuario sem permissão')
        }
    }

    async update ({ params, request, response, auth }) {
        const data = request.all()
        console.log(data)
        const update = await User
            .query()
            .where('id', auth.jwtPayload.data.id)
            .update(request.all())
        return update
    }

    async destroy ({ params, response, auth }) {
        const user = await User.findOrFail(params.id)

        if (auth.jwtPayload.data.role !== 1) {
            return response.status(401).send('Usuario sem permissão')
        }

        await user.delete()
        return 'Usuario excluido com sucesso'
    }
}

module.exports = ProfessorController
