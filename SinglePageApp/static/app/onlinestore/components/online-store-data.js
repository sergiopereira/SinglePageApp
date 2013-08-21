define(['bus', 'underscore', 'backbone', '../model/cart', '../model/cart-item', '../model/category'],
    function(bus, _, Backbone, Cart, CartItem, Category) {

        var cart;

        function answerGetCart(msg, envelope) {
            if (cart) {
                bus.respond(cart, envelope);
            } else {
                cart = new Cart({});
                cart.fetch()
                    .done(function() {
                        bus.respond(cart, envelope);
                    });
            }
        }

        function answerGetCategories(msg, envelope) {
            var categories = new Backbone.Collection([], {
                url: '/api/categories',
                model: Category
            });
            categories.fetch()
                .done(function() {
                    bus.respond(categories, envelope);
                });

        }

        //wire up all command handlers
        bus.subscribe(bus.channels.modelData, 'get.cart', answerGetCart);
        bus.subscribe(bus.channels.modelData, 'get.categories', answerGetCategories);
    }
);