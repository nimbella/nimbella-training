$("#input").keyup(function () {
    $.post("/api/default/binary", 
      {
        text: $("#input").val()
      }, 
      function(data) {
        $("#output").text(data)
      }
    )
})
