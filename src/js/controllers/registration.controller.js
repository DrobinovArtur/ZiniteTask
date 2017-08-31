app.controller('registrationController', ['UserService', '$location', function (UserService, $location) {
    var vm = this;

    vm.registration = function () {
        var user = {
            name: vm.newUser.name,
            sname: vm.newUser.sname,
            phone: vm.newUser.phone,
            mail: vm.newUser.email,
            login: vm.newUser.login,
            password: vm.newUser.password
        };

        UserService.registration(user);
        $location.path('profile');
    }
}]);
