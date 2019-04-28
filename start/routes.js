'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'AuthController.show')
Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')
Route.get('/app', 'AppController.index').middleware(['auth'])

Route.group(() => {
    Route.resource('tweets', 'TweetController').apiOnly().except('update')
}).middleware('auth')

Route.group(() => { 
    Route.post('/aluno', 'StudentController.registerAluno')
}).prefix('api/v1').middleware('auth')

Route.group(() => { 
    Route.post('/professor', 'TeacherController.registerTeacher')
}).prefix('api/v1').middleware('auth')