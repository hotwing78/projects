var app = angular.module("todo", []);

app.controller('mainCtrl', function($scope, $http){
	//Show todos
	// 1. Getting the todos from the server
	// 2. Placing the response into a model
	$scope.todos = [];

	$http.get("http://localhost:8080/api/todos")
		.then(function successCallback(response){
			console.log(response);
			$scope.todos = response.data;
		}, function errorCallback(response){
			console.log(response);
		});

	// 1. Create a createTodo function
	$scope.createTodo = function(text){
		// 2. Create a todo object to send to the server
		var todo = {"text": text};
		// 3. Create the $http.post call
		var config = {
			method: 'POST',
			url: 'http://localhost:8080/api/todos',
			headers: {
			 'Content-Type': 'application/json'
			},
			data: todo
		}
		// 4. Call the server using 3
		$http(config).then(function successCallback(response){
			console.log(response);
			// 5. Update the $scope.todos with the response.
			$scope.todos = response.data;
			$scope.todoText = "";
		}, function errorCallback(response){
			console.log(response);
		});
	};

	$scope.editTodo = function(todoId){
		var newText = prompt("New Text: ");
		var newTextJson = {"text": newText};
		var config = {
			'method': 'PUT',
			'url': 'http://localhost:8080/api/todos/' + todoId,
			'headers': {
				'Content-Type': 'application/json'
			},
			'data': newTextJson
		}
		$http(config).then(function successCallback(response){
				console.log(response);
				$scope.todos = response.data;
			}, function errorCallback(response){
				console.log(response);
			});
	}

	$scope.deleteTodo = function(todoId){
		$http.delete("http://localhost:8080/api/todos/" + todoId)
			.then(function successCallback(response){
				console.log(response);
				$scope.todos = response.data;
			}, function errorCallback(response){
				console.log(response);
			});
	};
});







