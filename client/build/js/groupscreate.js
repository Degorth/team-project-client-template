
function addMember() {
  var html = '<li>'+
    '<div class="well">'+
    '<label for="memName">Name</label>'+
    '<input type="member_name" class="form-control">'+
    '</input>'+
    '<label for="memContact">Contact Info</label>'+
    '<input type="member_contact_info" class="form-control">'+
    '</input>'+
    '<label for="memContact">Role in Group</label>'+
    '<select class="form-control">'+
    '<option>admin</option>'+
    '<option>other</option>'+
    '</select>'+
    '</input>'+
    '<br>'+
    '<button class="btn default remove-button">'+
    '<span class="glyphicon glyphicon-trash"></span>'+
    '</button>'+
    '<button class="btn btn-primary pull-right">'+
    'Link to Profile'+
    '</button>'+
    '</div>'+
  '</li>';

  $('#memberList').append(html);
}

$(document).on('click', '.remove-button', function() {
  $(this).parent().remove();
});
