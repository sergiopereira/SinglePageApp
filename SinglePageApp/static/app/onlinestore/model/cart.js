define(['bus', 'underscore', 'app-model'],
    function(bus, _, AppModel) {
        return AppModel.extend({
            urlRoot: '/api/cart',

            defaults: {
                items: []
            },
            
            initialize: function () {
                AppModel.prototype.initialize.apply(this, arguments);
                
            }
        });
    }
);