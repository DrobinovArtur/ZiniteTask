app.controller('appCtrl', ['UserService', 'ProductsService', function (UserService, ProductsService) {
    var vm = this;

    vm.logOut = function () {
        UserService.logOut();
    };

    vm.init = function () {
        UserService.initFakeUsers();
        UserService.checkAuthorization();
        ProductsService.initFakeProducts();
    };

    vm.init();
}]);
