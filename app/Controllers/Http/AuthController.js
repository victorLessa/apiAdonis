'use strict'
const Database = use('Database')
const Hash = use('Hash')
const User = use('App/Models/User')
const RoleUser = use('App/Models/RoleUser')
class AuthController {

    async show () {
        const user = await User.query().with('tweets').fetch()
        return user
    }

    async register ({ request }) {
        const data = request.only(['email', 'password', 'username'])
        const trx = await Database.beginTransaction()
        console.log(data)
        const user = await User.create(data, trx)
        await RoleUser.create({ user_id: user.id, role_id: 1}, trx)
        // once done commit the transaction
        trx.commit()
        return user
    }

    async authenticate ({ request, auth }) {
        const { email, password } = request.all()
        const user = await Database
            .select()
            .from('users')
            .leftJoin('role_users', 'users.id', 'role_users.user_id')
            .where({email: email})
            .first(
                'users.id',
                'users.email',
                'users.password',
                'role_users.role_id'
              )
        const isPass = await Hash.verify(password, user.password)
        const jwtPayload = { id: user.id, email: user.email, role: user.role_id}
        const token = await auth.attempt(email, password, jwtPayload)
        return token
    }
}

module.exports = AuthController
