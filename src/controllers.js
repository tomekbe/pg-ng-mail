// Create a module for our core AMail services
var aMailServices = angular.module('AMail', []);

// Set up our mappings between URLs, templates, and controllers
function emailRouteConfig($routeProvider) {
$routeProvider.when('/', {
	controller: ListController,
	templateUrl: 'list.html'
}).

// Notice that for the detail view, we specify a parameterized URL component
// by placing a colon in front of the id
when('/view/:id', {
	controller: DetailController,
	templateUrl: 'detail.html'
}).

when('/hi', {
	controller: HiController,
	templateUrl: 'hello.html'
}).

	otherwise({
	redirectTo: '/'
});
}
// Set up our route so the AMail service can find it
aMailServices.config(emailRouteConfig);


// Some fake emails
messages = [{
	id: 0, sender: 'jean@somecompany.com', subject: 'Hi there, old friend',
	date: 'Dec 7, 2013 12:32:00', recipients: ['greg@somecompany.com'],
	message: 'Hey, we should get together for lunch sometime and catch up. There are many things we should collaborate on this year.'
}, {
	id: 1, sender: 'maria@somecompany.com',
	subject: 'Where did you leave my laptop?',
	date: 'Dec 7, 2013 8:15:12', recipients: ['greg@somecompany.com'],
	message: 'I thought you were going to put it in my desk drawer. But it does not seem to be there.'
}, {
	id: 2, sender: 'bill@somecompany.com', subject: 'Lost python',
	date: 'Dec 6, 2013 20:35:02', recipients: ['greg@somecompany.com'],
	message: "Nobody panic, but my pet python is missing from her cage.'She doesn't move too fast, so just call me if you see her."
}, ];


hello = [{a:"First Item" },{a:"Second Item"}];

// Publish our messages for the list template
function ListController($scope) {
	$scope.messages = messages;
}
// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.
function DetailController($scope, $routeParams) {
	$scope.message = messages[$routeParams.id];
	console.log($routeParams);
}


/*function HiController($scope, $http) {
	//$scope.powitanie = Items.query();
	//console.log(Items.query())

	$http.get('http://pizg.net/slim/app/wines').success(function(data, status, headers, config) {
		$scope.items = data;
		//console.log(data.wine[0].country)
		console.log($scope)
	});

} */

/*function HiController($scope, Items) {



	$scope.powitanie  = Items.query();
	console.log();

} */


function HiController($scope, Source) {

		
	Source.getSource(function(data) {
		$scope.items = data;
	});


	$scope.newWine =  {"region":"Bordeaux","description":"Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the\nsenses."},
	
	$scope.newWine.id = 999;
	$scope.newWine.name ="Test One";
	$scope.newWine.year = 2000;
	$scope.newWine.grapes = "Cab Sav";
	$scope.newWine.country = "UK";


		//getting the data on the callback

	$scope.addWine = function () {
		//Source.deleteWine();
		Source.addWine($scope.newWine , function() {
			
			Source.getSource(function(data) { $scope.items = data;});
		
		});

	
	};

	// deletes wine by its id
	$scope.deleteWine =  function (n) {
		console.log(n,"whatever");
		
		Source.deleteWine(n, function() {  
				
				Source.getSource(function(data) { $scope.items = data;});

		});
	}

}



// directives

aMailServices.directive("superman", function() {
  return {
    restrict: "E",
    template: "<div> Here I am to save the day </div>"
  }
})


// factory services
aMailServices.factory("Source",['$http', function($http) {
	
	return {

		 getSource: function(callback) {
          	var url = 'http://pizg.net/slim/app/wines';
	          $http.get(url).success(function(data, status,header, config) {
	             	callback(data);
	          })
       	},

       	deleteWine: function(number, callback) {
       		var url = 'http://pizg.net/slim/app/wines/'+number;
       		$http.delete(url).success(function(data, status,header, config) {
	             	callback();
	        })
       	}
       	, addWine: function (d, callback) {
       		  $http({
            		url: 'http://pizg.net/slim/app/wines',
            		method: "POST",
            		data: d,
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        			}).success(function (data, status, headers, config) {
                		//$scope.persons = data; // assign  $scope.persons here as promise is resolved here 
                		console.log("wino jest dodane teraz");

                		callback();
                		
            	}).error(function (data, status, headers, config) {
                 //$scope.status = status;
                 console.log("cos poszlo nie tak z dodaniem wina");
            });

       	}

	}

}])

//.

aMailServices.factory('Items', function() {
		 	

		 	return {
		 		query: function() {
		 			return [
							{title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
							{title: 'Polka dots', description: 'Dots with polka', price: 2.95},
							{title: 'Pebbles', description: 'Just little rocks', price: 6.95}
					   ];
		 		},
		 		query2: function() {
		 			return [
							{title: 'Paint pots2', description: 'Pots full of paint2', price: 3.95},
							{title: 'Polka dots2', description: 'Dots with polka2', price: 2.95},
							{title: 'Pebble2s', description: 'Just little rocks2', price: 6.95}
					   ];
		 		},
		 		queryAj: function () {

		 				/*$.ajax({
            				type: 'GET',
            				url: 'http://pizg.net/slim/app/wines',
            				crossdomain:true,
            				dataType: "json", // data type of response
            				success: function(data) {}
        				}).done(function(data) {
        						return data
            					//console.log(data, "this is a response"); 
        					}); */


		 		}
		 	}	
	
		});////