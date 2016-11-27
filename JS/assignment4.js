var search = [];

$(function(){
  $.ajax({
    url: "http://www.mattbowytz.com/simple_api.json?data=all",
    method: "GET"
  }).success(function(data) {
    console.log(data);
    $.each(data, function() {
      $.each(this, function(ke, va) {
        $.each(this, function(k, v) {
          if (ke !== "hint") {
            search.push(v);
          }
        });
      });
    });
    search.sort();
  }).fail(function(data) {
    console.log(data);
  });
});

$('.flexsearch-input').focus(function (){
  var curString = $(this).val();
  if(curString == '') {
    $('#dropdown').empty();
  }
  $('#dropdown').slideDown();
  $('p').click(function (){
    var sel = $(this).text();
    $('.flexsearch-input').val(sel);
  });
  $('.flexsearch-input').keypress(function (e){
    $('#dropdown').empty();
    curString = $(this).val() + String.fromCharCode(e.which);
    $.each(search, function(k, v) {
      if(v.toLowerCase().indexOf(curString.toLowerCase()) === 0){
        $('#dropdown').append('<p>'+v+'</p>');
      }
    });
  });
});

$('.flexsearch-input').focusout(function (){
  $('#dropdown').slideUp();
});