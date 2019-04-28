'use strict'
const service = require('../../service/teacher')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
class ProfessorController {

    constructor () {
        this.serviceTeacher = new service()
    }

    async registerTeacher ({ request, response, auth }) {
        if (auth.jwtPayload.data.role === 1) {
            await this.serviceTeacher.registerTeacher(request)
            return 'Professor cadastrado com sucesso'
        } else {
            response.status(401).send('Usuario sem permissão')
        }
    }
}

module.exports = ProfessorController
