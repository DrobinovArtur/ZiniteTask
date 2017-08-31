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
