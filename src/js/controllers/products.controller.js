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
