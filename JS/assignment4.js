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
  $('#dropdown').empty();
  $.each(search, function(k, v) {
    if(v.toLowerCase().indexOf(curString.toLowerCase()) === 0){
      $('#dropdown').append('<p>'+v+'</p>');
    }
  });
  $('#dropdown').slideDown();
  $('.flexsearch-input').keypress(function (e){
    $('#dropdown').empty();
    curString = $(this).val() + String.fromCharCode(e.which);
    $.each(search, function(k, v) {
      if(v.toLowerCase().indexOf(curString.toLowerCase()) === 0){
        $('#dropdown').append('<p>'+v+'</p>');
      }
    });
  });
  $('.flexsearch-input').keydown(function (e){
    $('#dropdown').empty();
    if(e.keyCode === 8){
      curString = $(this).val().slice(0,-1);
      $.each(search, function(k, v) {
        if(v.toLowerCase().indexOf(curString.toLowerCase()) === 0){
          $('#dropdown').append('<p><a>'+v+'</a></p>');
        }
      });
    }
  });
});

$('.flexsearch-input').focusout(function (){
  $('p').click(function (){
    var sel = $(this).text();
    var url = 'https://www.google.com/search?q=' + sel;
    $('.flexsearch-input').val(sel);
    window.open(url, '_blank');
  });
  $('#dropdown').slideUp();
});