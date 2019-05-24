'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClassUser extends Model {
    classes () {
        return this.belongsTo('App/Models/Class')
    }
}

module.exports = ClassUser
