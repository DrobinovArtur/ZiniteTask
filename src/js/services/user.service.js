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
