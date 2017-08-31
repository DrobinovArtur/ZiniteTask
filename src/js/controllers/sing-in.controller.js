app.controller('signInCtrl', ['UserService', '$location', function (UserService, $location) {
    var vm = this;

    vm.signIn = function () {
        if (vm.account) {
            UserService.signIn(vm.account, function (check) {
                    if (check) {
                        $location.path('profile');
                    }
                })

        }
    };
}]);
