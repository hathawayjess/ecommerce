angular.module('ecommerce')
.controller('productCtrl', function($scope, productService, $http) {
  $scope.test = "test";
  // $scope.products = products;
  $scope.getProducts = function() {
    console.log('uhhhh');
    productService.getProducts().then(function(response) {
      console.log(response);
      $scope.products = response;
    });
 }
 $scope.getProducts();
})
