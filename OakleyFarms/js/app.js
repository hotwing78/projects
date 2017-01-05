let app = angular.module('OakleyFarms', ['ngRoute']);

//controllers
require('./controllers/homeController.js')(app);


// //services
// require('./services/homeService.js')(app);


app.config(['$routeProvider', function($routeProvider){
  $routeProvider

  .when('/',{
    redirectTo: '/home',
  })
  .when('/home',{
    controller: 'homeController',
    templateUrl: 'templates/home.html'
  })
}]);
