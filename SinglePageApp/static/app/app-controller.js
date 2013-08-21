define(['backbone', 'underscore'], function (Backbone, _) {
    var controllerOptions = ['name'];
    
    var AppController = function(options) {
        _.extend(this, _.pick(options||{}, controllerOptions));
        this.initialize.apply(this, arguments);
    };
    
    _.extend(AppController.prototype, Backbone.Events, {
        initialize: function() {
            //nothing here for now;
        }
    });

    AppController.extend = Backbone.Model.extend;

    return AppController;
});