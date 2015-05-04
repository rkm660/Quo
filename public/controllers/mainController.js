var quoApp = angular.module('quoApp', []);
quoApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    $scope.editing = true;	
    $scope.quote = "";

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
    	$scope.editing = true;	

		console.log("in addQuote");
        if ($scope.quote.length != 0){
    	$http.post('/quotes',$scope.quote).success(function(response){
    			//console.log(response['quote']);
    			refresh();
    	});
}


    };
    $scope.removeQuote = function(id){
    	console.log(id);
    	$scope.editing = true;	
    	$http.delete('/quotes/'+id).success(function(response){

    			refresh();
    	});
    };

    $scope.editQuote = function(id){
    		console.log("got in edit");
    		$http.get('/quotes/'+ id).success(function(response){
    			$scope.quote = response;
    			$scope.editing = false;	
    		});
    };

    $scope.updateQuote = function(){
    	console.log("in update");
    	$scope.editing = true;	

    	$http.put('/quotes/' + $scope.quote._id, $scope.quote).success(function(response){
    			refresh();
    	});

    }

}]);