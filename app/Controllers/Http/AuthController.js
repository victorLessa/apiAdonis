'use strict'
const service = require('../../service/auth')
const serviceAdmin = new service()
const User = use('App/Models/User')
class AuthController {

    async show () {
        const user = await User.query().with('tweets').fetch()
        return user
    }

    async register ({ request }) {
        await serviceAdmin.register(request)
        return {result:'Cadastro realizado com sucesso'}
    }

    async authenticate ({ request, auth }) {
        const result = await serviceAdmin.authenticate(request, auth)
        return result
    }
    
    async registerStudent ({ request, response, auth }) {
        if (auth.jwtPayload.data.role !== 1) {
            return response.status(402).send({ result:'Token invalido'})
        }
        await serviceAdmin.registerStudent(request)
        return {result: 'Cadastro de aluno realizado com sucesso'}
    }
}

module.exports = AuthController
