define(['bus', 'underscore', 'backbone', 'app-model', './product'],
    function(bus, _, Backbone, AppModel, Product) {
        return AppModel.extend({
            defaults: {
                name: null,
                productIds: [],
                products: []
            },
            
            initialize: function () {
                AppModel.prototype.initialize.apply(this, arguments);
                
            },
            
            getProductsCollection: function() {
                return new Backbone.Collection(this.get('products'), { model: Product });
            }
        });
    }
);