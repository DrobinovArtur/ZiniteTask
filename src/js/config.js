app.config(['$stateProvider' , function ($stateProvider) {
    $stateProvider
        .state("sign-in", {
            url: '/sign-in',
            templateUrl: "templates/sign-in.html",
            controller: "signInCtrl",
            controllerAs: "signIn"
        })
        .state('registration', {
            url: '/registration',
            templateUrl: "templates/registration.html",
            controller: "registrationController",
            controllerAs: "reg"
        })
        .state("profile", {
            url: '/profile',
            templateUrl: "templates/profile-page.html",
            controller: "profileCtrl",
            controllerAs: "profile"
        })
        .state('profile.users', {
            url: '/users',
            templateUrl: "templates/users-list.html",
            controller: "userListController",
            controllerAs: "usList"
        })
        .state('profile.products', {
            url: '/products',
            templateUrl: "templates/products.html",
            controller: "productsController",
            controllerAs: "productCtrl"
        });
}]);
