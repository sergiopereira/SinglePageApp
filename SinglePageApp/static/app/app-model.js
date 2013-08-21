define(['backbone', 'underscore', 'backboneNested'], function(Backbone, _) {
    return Backbone.NestedModel.extend({
        initialize: function() {
            //does nothing for now
        }
        
        //omitted: override save() to include AFT headers if you need them.
    });
});