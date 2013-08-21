define(['bus', 'underscore', 'jquery', 'app-controller', './model/cart-item',
        './views/cart-view', './views/category-list-view', './views/product-list-view'],
    function (bus, _, $, AppController, CartItem,
        CartView, CategoriesView, ProductsView) {
        
        return AppController.extend({
            initialize: function(options) {
                AppController.prototype.initialize.apply(this, arguments);
                bus.subscribe(bus.channels.ui, 'category:selected', _.bind(this.onCategorySelected, this));
                bus.subscribe(bus.channels.ui, 'cart:add-product', _.bind(this.onAddProductToCart, this));
                bus.subscribe(bus.channels.ui, 'cart:remove-product', _.bind(this.onRemoveProductToCart, this));
                this.reset();
            },
            
            reset: function () {
                this.resetCartView();
                this.resetCategoriesView();
            },
            
            onCategorySelected: function (category, envelope) {
                this.selectedCategory = category;
                this.resetProductsView(category);
            },
            
            onAddProductToCart: function(product) {
                var itemInCart = _.where(this.cart.get('items'), { productId: product.id })[0],
                    index;
                if (itemInCart) {
                    index = this.cart.get('items').indexOf(itemInCart);
                    this.cart.set('items[' + index + '].quantity', itemInCart.quantity + 1);
                } else {
                    // add() is a method added by BackboneNested
                    this.cart.add('items', {
                         quantity: 1, 
                         productId: product.id, 
                         unitPrice: product.get('price'), 
                         name: product.get('name')
                    });
                    this.cart.save();
                }
            },
            
            onRemoveProductToCart: function(productId) {
                var itemInCart = _.where(this.cart.get('items'), { productId: productId })[0],
                    index;
                if (itemInCart) {
                    index = this.cart.get('items').indexOf(itemInCart);
                    //remove() is from BackboneNested
                    this.cart.remove('items[' + index + ']');
                    this.cart.save();
                }
            },
            
            resetCategoriesView: function() {
                var ctrl = this;
                this.categories = null;
                if (this.categoriesView) {
                    this.categoriesView.remove();
                    this.categoriesView = null;
                }

                bus.postCommand(bus.channels.modelData, 'get.categories', { })
                    .done(function (categories) {
                        ctrl.categories = categories;
                        ctrl.categoriesView = new CategoriesView({ collection: categories, el: '#category-list' });
                        //ctrl.categoriesView.render().$el.appendTo('#category-list');
                        bus.postMessage(bus.channels.ui, 'category:selected', categories.first());
                    })
                    .fail(function (err) {
                        bus.postMessage(bus.channels.logger, 'error', err);
                    });
            },
            
            resetProductsView: function () {
                this.products = null;
                if (this.productsView) {
                    this.productsView.remove();
                    this.productsView = null;
                }

                this.products = this.selectedCategory.getProductsCollection();
                this.productsView = new ProductsView({ collection: this.products });
                this.productsView.render().$el.appendTo('#product-list');
            },
            
            resetCartView: function() {
                var ctrl = this;
                this.cart = null;
                if (this.cartView) {
                    this.cartView.remove();
                    this.cartView = null;
                }

                bus.postCommand(bus.channels.modelData, 'get.cart', { })
                    .done(function (cart) {
                        ctrl.cart = cart;
                        ctrl.cartView = new CartView({ model: cart });
                        ctrl.cartView.render().$el.appendTo('#cart');
                    })
                    .fail(function (err) {
                        bus.postMessage(bus.channels.logger, 'error', err);
                    });
            }
            
        }); 
    }
);