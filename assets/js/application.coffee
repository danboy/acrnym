#= require_tree ./lib

$.fn.initializeDelete = (csrf) ->
  @each ->
    objId = $(this).data("object")
    $obj = $(this)
    $obj.click ->
      $.ajax
        type: "DELETE"
        data:
          _csrf: csrf 
        url: $obj.data('url') + objId
        success: ->
          $obj.parent().remove()
