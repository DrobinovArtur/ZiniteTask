var app = angular.module('twitterModule', ['ui.router']);

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

app.controller('productsController', ['ProductsService','UserService', function (ProductsService, UserService) {
    var vm = this;
    vm.products = new Array();
    vm.checkLike = true;

    vm.addProduct = function () {
        var product = {
            title: vm.newProduct.title,
            message: vm.newProduct.message,
            price:vm.newProduct.price
        };
        ProductsService.addProduct(product);
        product = new Object();
        vm.products = ProductsService.getProducts();
    };
    vm.viewProducts =function (product) {
        vm.currentProduct = product;
        UserService.addPrevProd(product)
    };
    vm.deleteProduct = function (id) {
        ProductsService.deleteProduct(id);
    }



    vm.init = function () {
        vm.products = ProductsService.getProducts();
        vm.currentUser = UserService.getCurrentUser();
    };

    vm.init();
}]);

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

app.factory('ProductsService', ['$q', 'UserService', function ($q, UserService) {
    var fakeProducts = [];
    var Products = [];

    function initFakeProducts() {
        fakeProducts = localStorage.getItem('fakeProducts') ? JSON.parse(localStorage.getItem('fakeProducts')) : fakeProductMessage;
        var ProductsJson = JSON.stringify(fakeProducts);
        localStorage.setItem('fakeProducts', ProductsJson);
    };

    /**
     * Create new Product
     * @param title
     * @param message
     * @param userId
     * @param date
     * @constructor
     */

    // function Product(title, message, userId) {
    //     this.id = fakeProducts.length ? fakeProducts[fakeProducts.length - 1].id + 1 : 1;
    //     this.title = title;
    //     this.message = message;
    //     this.user = UserService.getUserById(userId);
    // };

    /**
     * Add new Product to fakeProduct array
     * @param Product {title, message, date}
     */
    function addProduct(product) {
        var userId = UserService.getCurrentUser();
        product.id=new Date()
        product.user = userId.id;
        fakeProducts.push(product);

        updateStorage();

    }

    function deleteProduct(id) {
        for(var x=0;x<fakeProducts.length;x++){
            if (fakeProducts[x].id==id){
                fakeProducts.splice(x,1)
            }
        }
        updateStorage();
    }

    /**
     * Update Product in local storage
     */
    function updateStorage() {
        var Products = JSON.stringify(fakeProducts);
        localStorage.setItem('fakeProducts', Products)
    }

    /**
     * @returns {Array}
     */
    function getProducts() {
        return fakeProducts;
    }



    return {
        initFakeProducts: initFakeProducts,
        getProducts: getProducts,
        addProduct: addProduct,
        deleteProduct: deleteProduct
    }
}]);

var fakeProductMessage = [
    {
        title: 'De Finibus Bonorum',
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur',
        id: 2,
        price:123,
        user: 1,
    },
    {
        title: 'Quis autem vel',
        message: ' Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora iniosam, nisi ut aliquid ex ea commodi consequatur?',
        id: 2,
        price:23,
        user: 1,
    },
    {
        title: 'Modi tempora',
        message: 'am est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt uquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        id: 3,
        price:233,
        user: 1,
    },
    {
        title: 'Exercitationem ullam',
        message: ' m ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipuatur?',
        id: 1,
        price:993,
        user: 1,
    }
];

app.factory('UserService', ['$q', '$location', function ($q, $location) {
    var fakeUsers = [];
    var currentUser = {};

    /**
     * function to create fake user list
     */
    function initFakeUsers() {
        fakeUsers = localStorage.getItem('fakeUsers') ? JSON.parse(localStorage.getItem('fakeUsers')) : allFakeUsers ;

        localStorage.setItem('fakeUsers', JSON.stringify(fakeUsers));
    };

    /**
     * Create new User
     * @param username
     * @constructor
     */
    function User(username, password) {
        this.username = username;
        this.password = password;
        this.id = fakeUsers.length ? fakeUsers[fakeUsers.length - 1].id + 1 : 1;
    };




    function signIn(user, callback) {
            fakeUsers.forEach(function (element) {
                debugger
                if (user.username === element.username && user.password === element.password) {
                    currentUser = element;
                    sessionStorage.setItem('currentUser', JSON.stringify(element));
                    callback(true)
                    return
                }
            });
            callback(false);
    };


    function getUserById(id) {
        for (var i = 0; i < fakeUsers.length; i++) {
            if (fakeUsers[i].id === id) {
                return fakeUsers[i];
            }
        }
    };

    /**
     *  Current user
     * @returns {{name, sname, phone, mail, posts, online, followUsers, id}}
     */
    function getCurrentUser() {
        return currentUser;
    };

    /**
     * @returns {Array}
     */
    function getAllUsers() {
        return fakeUsers;
    };

    function addPrevProd(prod) {
        currentUser.prev = currentUser.prev ? currentUser.prev : [];
        if(currentUser.prev.length > 4){
            currentUser.prev.shift();
        }
        currentUser.prev.push(prod);
        updateStorage();
    }

    /**
     * Log out from account
     * Set user to offline
     */
    function logOut() {
        toDoUserOffline();
        sessionStorage.removeItem('currentUser');
        currentUser = {};
        checkAuthorization();
    }

    /**
     * check if user is in sessionStorage
     * if user is not, redirect to sing-in page
     */
    function checkAuthorization() {
        var userFromStorage = JSON.parse(sessionStorage.getItem('currentUser'));
        if (userFromStorage) {
            for (var i = 0; i < fakeUsers.length; i++) {
                if (userFromStorage.id === fakeUsers[i].id) {
                    currentUser = fakeUsers[i];
                    updateStorage();
                    break;
                }
            }
            $location.path('profile/users');
            return;
        }
        $location.path('sign-in');
    }

    function updateStorage() {
        var users = JSON.stringify(getAllUsers());
        localStorage.setItem('fakeUsers', users);
    }

    /**
     * find current user in fake users list
     * set prop online for current user in  fake users list to false
     * update local storage
     */
    function toDoUserOffline() {
        for (var i = 0; i < fakeUsers.length; i++) {
            if (fakeUsers[i].id === getCurrentUser().id) {
                fakeUsers[i].online = false;
                updateStorage();
                return;
            }
        }
    }

    return {
        initFakeUsers: initFakeUsers,
        signIn: signIn,
        getCurrentUser: getCurrentUser,
        getAllUsers: getAllUsers,
        getUserById: getUserById,
        checkAuthorization: checkAuthorization,
        logOut: logOut,
        toDoUserOffline: toDoUserOffline,
        addPrevProd : addPrevProd
    }
}]);

var allFakeUsers = [
    {
        name: "Artur",
        username: "Artur",
        password: "123",
        id:1
    },
    {
        name: "Andrian",
        username:"Andrian",
        password:"1234",
        id:2
    }

];
