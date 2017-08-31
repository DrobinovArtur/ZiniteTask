app.controller('profileCtrl', ['UserService', function (UserService) {
    var vm = this;
    vm.currentUser = new Object();



    vm.checkMySelf = function (user) {
        return user.id !== vm.currentUser.id;
    };



    vm.init = function () {
        vm.currentUser = UserService.getCurrentUser();
        UserService.checkAuthorization();
    };

    vm.init();
}]);
