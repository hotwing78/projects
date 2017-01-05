let app = angular.module('FriendApp',[]);

function getPerson
app.controller('FriendController', function ($scope, $http){
  // $scope.name = 'Damon';
  // $scope.job = 'Unemployed';

  $scope.person = {
    name: 'Damon',
    job: 'Developer',
  };

  $scope.flip = function(){
    console.log('flip flip')
  }
  $http({
    method 'GET',
    url: 'https//randomuser.me/api/'
  }).then(function(response){
    let person = response.data.results[0];
    $scope.person.name = person.name.first;
  })
});
