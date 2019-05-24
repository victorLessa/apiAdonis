'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Class extends Model {
    classes () {
        return this.hasMany('App/Models/ClassUser')
    }
}

module.exports = Class
