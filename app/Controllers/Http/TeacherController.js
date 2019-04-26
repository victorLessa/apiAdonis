'use strict'
const service = require('../../service/teacher')
class ProfessorController {

    constructor () {
        this.serviceTeacher = new service()
    }

    async registerTeacher ({ request }) {
        await this.serviceTeacher.registerTeacher(request)
        return 'Professor cadastrado com sucesso'
    }
}

module.exports = ProfessorController
