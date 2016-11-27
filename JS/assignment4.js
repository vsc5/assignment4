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

$(document).ready(function(){
  $('.flexsearch-input').focus(function (){
    var curString = $(this).val();
    if(curString == '') {
      $('#dropdown').empty();
    }
    $('#dropdown').slideDown();
    $('p').click(function (e){
      e.preventDefault();
      var sel = $(this).text();
      $('.flexsearch-input').val(sel);
    });
    $('.flexsearch-input').keypress(function (e){
      $('#dropdown').empty();
      curString = $(this).val() + String.fromCharCode(e.which);
      $.each(search, function(k, v) {
        if(v.toLowerCase().indexOf(curString.toLowerCase()) === 0){
          var url = "http://google.com/search?q=" + v;
          $('#dropdown').append('<p><a>'+v+'</a></p>');
          $('#dropdown > p:last-child > a').attr('href', url);
          $('#dropdown > p:last-child > a').attr('target', '_blank');
        }
      });
    });
    $('.flexsearch-input').keydown(function (e){
      $('#dropdown').empty();
      if(e.keyCode === 8){
        curString = $(this).val().slice(0,-1);
        $.each(search, function(k, v) {
          if(v.toLowerCase().indexOf(curString.toLowerCase()) === 0){
            var url = "http://google.com/search?q=" + v;
            $('#dropdown').append('<p><a>'+v+'</a></p>');
            $('#dropdown > p:last-child > a').attr('href', url);
            $('#dropdown > p:last-child > a').attr('target', '_blank');
          }
        });
      }
    });
  });
});

$('.flexsearch-input').focusout(function (){
  $('#dropdown').slideUp();
});