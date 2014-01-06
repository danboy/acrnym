#= require ../templates/users.jade
#= require ../lib/backbone.js

class User extends Backbone.Model
  initialize: (options)->
    @url = options.url
  
class Users extends Backbone.Collection
  initialize: (options)->
    @url = options.url
  model: User

class usersView extends Backbone.View
  initialize: (options)->
    @collection = new Users
      url: options.url
    @collection.fetch
      success: ()=>
        @render()

  template: users
  
  render: ()->
    data = @collection.toJSON()
    console.log data
    @$el.html this.template({users: data})

user = new usersView
  url: url
  el: $('.users')
