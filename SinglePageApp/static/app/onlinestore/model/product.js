define(['bus', 'underscore', 'app-model'],
    function(bus, _, AppModel) {
        return AppModel.extend({
            defaults: {
                name: null,
                price: null
            },
            
            initialize: function () {
                AppModel.prototype.initialize.apply(this, arguments);
                
            }
        });
    }
);