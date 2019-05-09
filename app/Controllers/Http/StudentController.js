'use strict'
const service = require('../../service/student')
const Student = use('App/Models/Student')
class StudentController {
    constructor () {
        this.serviceStudent = new service()
    }

    /**
     * Show a list of all tweets.
     * GET tweets
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index ({ request, response, auth }) {
        const student = await Student.query().with('user').fetch()
        return student
    }

    async registerStudent ({ request, response, auth }) {
        if (auth.jwtPayload.data.role !== 1) {
            response.status(401).send('Usuario sem permissão')
            return
        }
        await this.serviceStudent.registerStudent(request)
        return 'Login realizado com sucesso'
    }
}

module.exports = StudentController
