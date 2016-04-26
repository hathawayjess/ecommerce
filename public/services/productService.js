angular.module('ecommerce')
  .service('productService', function($http, $q) {



    this.getProducts = function() {
      var deferred = $q.defer();
      console.log('helloooo!');
     $http.get('/products').then(function( response ) {
            console.log(response);
            deferred.resolve(response.data);
        })
        return deferred.promise;

}

});
