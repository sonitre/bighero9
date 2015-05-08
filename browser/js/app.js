var app = angular.module('TesselApp', []);


app.controller('MainCtrl', function($scope, $http){

    $scope.pics = '';

    $scope.getPics = function(){
        return $http.get('/pics').then(function(response){
            return response.data;
        })
    }

    $scope.getPics().then(function(pics){
        console.log(pics);
        $scope.pics = pics;
    });


});

