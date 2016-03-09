angular.module('ecommerce', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './views/homeTmpl.html',
        controller: 'mainCtrl'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: './views/adminTmpl.html'
      })
      .state('products', {
        url: '/products',
        templateUrl: './views/productTmpl.html',
        controller: 'productCtrl'
        // resolve: {
        //   products: function(productService) {
        //     console.log('are you resolving?')
        //     return productService.getProducts();
        //   } }

      });

    $urlRouterProvider.otherwise('/');
  })
