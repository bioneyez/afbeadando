'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')


class UserController {
      * index (request,response) {
        yield response.sendView('main');
    }


    * login (request,response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {
            response.redirect('/')
        }   

        yield response.sendView('login')
    }

    * doLogin (request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(email, password) 

      if (login) {
        response.redirect('/')
        return
      }
    } 
    catch (err) {
      yield request
        .withAll()
        .andWith({errors: [
          {
            message: 'Invalid credentails'
          }
        ]})
        .flash()

      response.redirect('/login')
    }
  }

    * register (request,response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {
        response.redirect('/')
        }

        yield response.sendView('register')
    }

    * doRegister (request, response) {
        const registerData = request.except('_csrf');

        const rules = {
        username: 'required|alpha_numeric|unique:users',
        email: 'required|email|unique:users',
        password: 'required|min:4',
        password_confirm: 'required|same:password',
        };

        const validation = yield Validator.validateAll(registerData, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        const user = new User()

        user.username = registerData.username;
        user.email = registerData.email;
        user.password = yield Hash.make(registerData.password) 
        yield user.save()
        
        yield request.auth.login(user)

        response.redirect('/')
  }

  * doLogout (request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }

  * ajaxLogin(request, response) {
    const email = request.input('email');
    const password = request.input('password');

    const login = yield request.auth.attempt(email, password);

    try
    {
      if (login)
      {
        response.send({ success: true });
        return;
      }
    }
    catch(err)
    {

    }

      response.send({ success: false });
  }
    
}

module.exports = UserController
