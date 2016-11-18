'use strict'

const Schema = use('Schema')

class TodoitemsTableSchema extends Schema {

  up () {
    this.create('todoitems', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('instructions').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('todoitems')
  }

}

module.exports = TodoitemsTableSchema
