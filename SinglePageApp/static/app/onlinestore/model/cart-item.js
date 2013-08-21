define(['bus', 'underscore', 'app-model'],
    function(bus, _, AppModel) {
        return AppModel.extend({
            defaults: {
                productId: null,
                quantity: null,
                name: null,
                unitPrice: null
            },
            
            initialize: function () {
                AppModel.prototype.initialize.apply(this, arguments);
                
            }
        });
    }
);