'use strict'

const Lucid = use('Lucid')

class Todo extends Lucid {
    category() {
        return this.belongsTo('App/Model/Category') 
    }
}

module.exports = Todo
