var blogHTMLStr = "<ul>";
blogs.forEach(function(element,idx){
  blogHTMLStr +=  `
    <li>
    <h3>Title:${element.title}</h3>
    <p>${idx}: ${element.content} </p>
    <h5>By: ${element.author} </h5>
    </li>`
});

  blogHTMLStr += "</ul>"

  $('.blogs').append(blogHTMLStr);


  $('form').on('submit', function(event){
    event.preventDefault();
    var newBlogPost = {
      title: $('input[name="title"]').val(),
      content: $('input[name="author"]').val(),,
      author: $('textarea').val(),
    };

    var htmlStr =
    `<li>
      <h3>Title:${element.title}</h3>
      <p>${idx}: ${element.content} </p>
      <h5>By: ${element.author} </h5>
    </li>`
  });

   $('ul').append(htmlStr);

   var contactPage {

   }

   var aboutPage = {

   }

   var otherPages = {`
     about:`
     ,
     `contact:`
   }
