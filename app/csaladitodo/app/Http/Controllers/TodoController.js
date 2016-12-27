'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Todo = use('App/Model/Todo')
const Validator = use('Validator')
const User = use('App/Model/User')

class TodoController {
    * index (request,response) {
        const categories = yield Category.all()
        for(let category of categories) {
            const todos = yield category.todos().limit(3).fetch();
            category.topTodos = todos.toJSON();
        }

        yield response.sendView('main', {
        name: '',
        categories: categories.toJSON()
    })  
    }

    * create (request, response) {
            const categories = yield Category.all()
            yield response.sendView('todoCreate', {
            categories: categories.toJSON()
            });
    }

    * doCreate (request, response) {
        const todoData = request.except('_csrf');

        const rules = {
        name: 'required',
        instructions: 'required',
        category_id: 'required'
        };

        const validation = yield Validator.validateAll(todoData, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        todoData.user_id = request.currentUser.id
        const todo = yield Todo.create(todoData)
        response.redirect('/')
    }

    * doDelete (request, response) {
        const id = request.param('id');
        const todo = yield Todo.find(id);

        if (request.currentUser.id !== todo.user_id) {
        response.unauthorized('Access denied.')
        return
        }

        yield todo.delete()
        response.redirect('/')
    }

    * show (request, response) {
        const id = request.param('id');
        const todo = yield Todo.find(id);
        yield todo.related('category').load();

        yield response.sendView('todoShow', {
        todo: todo.toJSON()
        })
    }

    * edit (request, response) {
        const categories = yield Category.all()
        const id = request.param('id');
        const todo = yield Todo.find(id);

        if (request.currentUser.id !== todo.user_id) {
        response.unauthorized('Access denied.')
        return
        }


        yield response.sendView('todoEdit', {
        categories: categories.toJSON(),
        todo: todo.toJSON()
        });
    }

    * doEdit (request, response) {
    const todoData = request.except('_csrf');

    const rules = {
      name: 'required',
      instructions: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validateAll(todoData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }



    const id = request.param('id');
    const todo = yield Todo.find(id);

    
    todo.name = todoData.name; 
    todo.instructions = todoData.instructions;
    todo.category_id = todoData.category_id;

    yield todo.save()
    
    response.redirect('/')
  }

    * ownTodos (request,response) {
        const id = request.currentUser.id
        const categories = yield Category.all()

        for(let category of categories) {
        const todos = yield category.todos().where('user_id', id).limit(3).fetch();
        category.topTodos = todos.toJSON();
        }

        yield response.sendView('main', {
        name: '',
        categories: categories.toJSON()
        })  
    }


    * ajaxDelete(request, response) {
        console.log('Test from ajaxDelete.');

        const id = request.param('id');
        const todo = yield Todo.find(id);

        if (todo)
        {
        if (request.currentUser.id !== todo.user_id)
        {
            request.unauthorized('Nem törölheted!');
            return;
        }

        yield todo.delete()

        response.ok(
            {
            succes: true
            }
        )

        return;
        }

        response.notFound('Nincs ilyen teendo!');
  }
  
}

module.exports = TodoController
