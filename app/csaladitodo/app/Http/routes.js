'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

//Route.on('/').render('welcome')

//Route.get('/', 'UserController.index')
Route.get('/login', 'UserController.login')
Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')

Route.get('/', 'TodoController.index')
Route.get('/todos/create', 'TodoController.create').middleware('auth')
Route.post('/todos/create', 'TodoController.doCreate').middleware('auth')
Route.get('/ownTodos', 'TodoController.ownTodos').middleware('auth')
Route.get('/todos/:id/delete', 'TodoController.doDelete').middleware('auth')
Route.get('/todos/:id/edit', 'TodoController.edit').middleware('auth')
Route.post('/todos/:id/edit', 'TodoController.doEdit').middleware('auth')

Route.get('/todos/:id', 'TodoController.show')



