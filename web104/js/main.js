$(document).ready(function() {

    var root = 'http://jsonplaceholder.typicode.com';
    var post = null;
    var comments = null;
    $.ajax({
        url: root + '/posts/1',
        method: 'GET'
        success: function(data){
          console.log(data);
        $('#post').html(`<div id ='title'> ${data.title} </div>
        <div id = 'body'> ${data.body}</div>`)
        },
        error: function(err){
          console.log('No Bueno',err);
        }

    });

    // $.ajax({
    //     url: root + '/posts/1/comments',
    //     method: 'GET'
    // }).then(function(data) {
    //     data.forEach(function(element,idx){
    //       console.log(element);
    //     });
    // });
});
