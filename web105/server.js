// Dependency Configuration
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

// Express Setup
var app = express();
app.use(express.static(__dirname + '/public'));


//MongoDB Setup
mongoose.connect('mongodb://localhost');


// Middleware Setup
app.use(morgan("dev")); // Logs endpoint hit to console
app.use(bodyParser.json()); // Parses JSON in request body
app.use(methodOverride()); // Makes dealing with PUT and DELETE easier

// Data Setup
// This set is only for us, since we aren't using a database just yet.
var todo = mongoose.model("Todo",{
  text: string;
});

// Routes

// GET Endpoint

var getTodos = function(response){
  Todo.find(function(err,todos){
    if(err) console.log(err);
    response.send(todos);
}
// This endpoint is triggered by hitting '/api/todos' with the GET verb.
// This endpoint return the array of todos
app.get('/api/todos', function(request, response) {
    // This function accepts request and response as parameters.
    // These are supplied by Express and house important data and functions.
      getTodos(response);
});

// POST Endpoint
// This endpoint is triggered by hitting '/api/todos'
// with the POST verb, and passing data either in JSON or XML format
// This endpoint returns the array of todos with the new todo in it
app.post('/api/todos', function(request, response) {
    // The request parameter contains the data passed in the HTML request.
    // It is accessed with request.body.<name of item passed>

    // Create todo object like the todos schema above.

    Todo.create({
      text:request.body.text
    },function(err,todo){
      if(err) console.log(err);
      getTodos(response);
    });
});

// PUT Endpoint
// This endpoint is triggered by hitting '/api/todos/:todo_id'
// with the PUT verb, and passing data either in JSON or XML format
// This endpoint will return a list of todos
// with the text in todos[todo_id] updated to what was passed in
app.put('/api/todos/:todo_id', function(request, response) {
    Todo.update({
      _id: request.params.todo_id
    },{
      text: request.body.text
    }, function(err, todo){
      if(err) console.log(err);
      getTodos(response);
    })
});

// DELETE Endpoint
// This endpoint is triggered by hitting '/api/todos/:todo_id' with the DELETE verb
// This endpoint will return a list of todos with the todo at todos[todo_id] deleted
app.delete('/api/todos/:todo_id', function(request, response) {
  Todo.remove({
    _id: request.params.todo_id
  },function(err,todo){
    if(err){
      console.log(err);
    }
    getTodos(response);
  })
});
//Start Server
app.listen(8080);
console.log("Up and running on port 8080");
