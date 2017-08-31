app.controller('userListController', ['UserService', function (UserService) {
    var vm = this;
    vm.currentUser = new Object();

    vm.init = function () {
        vm.currentUser = UserService.getCurrentUser();
        UserService.checkAuthorization();
    };

    vm.viewProducts =function (product) {
        vm.currentProduct = product;
    };

    vm.init();
}]);
