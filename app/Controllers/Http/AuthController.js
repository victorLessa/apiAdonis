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

    async authenticate ({ request, response, auth }) {
        const result = await serviceAdmin.authenticate(request, response, auth)
        return result
    }
}

module.exports = AuthController
