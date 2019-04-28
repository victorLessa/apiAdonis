'use strict'
const service = require('../../service/student')
class StudentControllxer {
    constructor () {
        this.serviceStudent = new service()
    }

    async registerAluno ({ request, response, auth }) {
        if (auth.jwtPayload.data.role !== 1) {
            response.status(401).send('Usuario sem permissão')
            return
        }
        await this.serviceStudent.registerAluno(request)
        return 'Login realizado com sucesso'
    }
}

module.exports = StudentController
