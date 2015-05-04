var quoApp = angular.module('quoApp', []);
quoApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
   
    var refresh = function(){

	$http.get('/quotes').success(function(response){
    	console.log("contorller received data");
    	console.log("**" + response);
    	$scope.quotesList = response;
    	$scope.quote = "";
    });

    }
    
    refresh();

    $scope.addQuote = function(){
//    	console.log($scope.quote);
		console.log("in addQuote");
    	$http.post('/quotes',$scope.quote).success(function(response){
    			console.log(response['quote']);
    			refresh();
    	});


    };
    $scope.removeQuote = function(id){
    	console.log(id);
    	$http.delete('/quotes/'+id).success(function(response){

    			refresh();
    	});
    };

    $scope.editQuote = function(id){
    		console.log("got in edit");
    		$http.get('/quotes/'+ id).success(function(response){
    			$scope.quote = response;
    		});
    };

    $scope.updateQuote = function(){
    	console.log("in update");
    	$http.put('/quotes/' + $scope.quote._id, $scope.quote).success(function(response){
    			refresh();
    	});

    }

}]);