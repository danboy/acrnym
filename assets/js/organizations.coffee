#= require lib/underscore.js
#= require lib/typeahead.js

$.ajax
  dataType: 'json'
  url: '/users'
  success: (r)->
    users = _.map r.users, (user) ->
      return {name: user.name, value: user.email, id: user._id}
    $('.user-typeahead').typeahead
      name: 'users'
      local: users

$('.user-add').click ()->
  email = $('.user-typehead').val()
