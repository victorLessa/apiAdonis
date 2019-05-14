'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  handle (error, response, code) {
    response.status(500).send({Status: code, Message: error})
    return
  }
}

module.exports = CustomException
