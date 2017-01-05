// Dependency Configuration
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');

// Express Setup
var app = express();

app.use(express.static(__dirname + '/public'));

// Middleware Setup
app.use(morgan("dev"));        // Logs endpoint hit to console
app.use(bodyParser.json());    // Parses JSON in request body
app.use(methodOverride());     // Makes dealing with PUT and DELETE easier

// Data Setup
// This set is only for us, since we aren't using a database just yet. 
var globalId = 2;
var todos = [{
    "id":1,
    "text": "Need to do this"
}];

// Routes

// GET Endpoint
// This endpoint is triggered by hitting '/api/todos' with the GET verb. 
// This endpoint return the array of todos
app.get('/api/todos', function(request, response){
    // This function accepts request and response as parameters. 
    // These are supplied by Express and house important data and functions.

    response.send(todos); // Is one way to return a request. 
});

// POST Endpoint
// This endpoint is triggered by hitting '/api/todos'
// with the POST verb, and passing data either in JSON or XML format
// This endpoint returns the array of todos with the new todo in it
app.post('/api/todos', function(request, response){
    // The request parameter contains the data passed in the HTML request.
    // It is accessed with request.body.<name of item passed>
    
    // Create todo object like the todos schema above.
    var todo = {
        "id": globalId,
        "text": request.body.text
    };
    
    // Add new todo to todos array
    todos.push(todo);
    // Increment Global Id in preparation for the next todo
    globalId++;
    // Send the todos array containing the new todo as the response. 
    response.send(todos);
});

// PUT Endpoint
// This endpoint is triggered by hitting '/api/todos/:todo_id'
// with the PUT verb, and passing data either in JSON or XML format
// This endpoint will return a list of todos
// with the text in todos[todo_id] updated to what was passed in
app.put('/api/todos/:todo_id', function(request, response){
    // Loop through the todos array to find the todo object being updated
    for(var i=0; i<todos.length; i++){
        // If the current todo's id matches the query parameter
        if(todos[i].id == request.params.todo_id){
            // update the text to what was sent in the body
            todos[i].text = request.body.text;
            // returns the updated list of todos
            // The return is in the if statement so that the for loop doesn't
            // run for longer than it needs to
            response.send(todos);
        }
    };
});

// DELETE Endpoint
// This endpoint is triggered by hitting '/api/todos/:todo_id' with the DELETE verb
// This endpoint will return a list of todos with the todo at todos[todo_id] deleted
app.delete('/api/todos/:todo_id', function(request, response) {
    // Loop through the todos array
        for(var i=0; i<todos.length; i++){
            // if the current todo's id matches the query parameter's
            if(todos[i].id == request.params.todo_id){
                // remove it from the array
                todos.splice(i, 1);
                // return the modified array
                response.send(todos);
            }
        };
});
//Start Server
app.listen(8080);
console.log("Up and running on port 8080");