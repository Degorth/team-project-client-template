 function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
              $('<li class="imageWrap"></li>')
                .append(
                $('<img></img>') //Equivalent: $(document.createElement('img'))
                  .attr('src', e.target.result)
                  .width(200)
                  .height(150)
                )
                .append(
                  $('<button></button>')
                  .attr('class', 'btn default image-button')
                  .append(
                    $('<span></span>')
                    .attr('class','glyphicon glyphicon-trash')
                  )
                )
                .appendTo('#imageList');
        };
        reader.readAsDataURL(input.files[0]);
    }
  }

  $(document).on('click', '.image-button', function() {
    $(this).parent().remove();
  });
