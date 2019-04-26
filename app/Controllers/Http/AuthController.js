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
        return 'Login realizado com sucesso'
    }

    async registerAluno ({ request, auth }) {
        const result = await serviceAdmin.registerAluno(request)
        return 'Login realizado com sucesso'
    }

    async authenticate ({ request, auth }) {
        const result = await serviceAdmin.authenticate(request, auth)
        return result
    }
}

module.exports = AuthController
