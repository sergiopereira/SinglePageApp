define(['backbone', 'underscore', 'jquery', 'mustache'], function(Backbone, _, $, Mustache) {
    return Backbone.View.extend({
        initialize: function () {
            this.rendered = false;
            this.childViews = {};
        },
        
        inflateTemplate: function(template, data) {
            var html =  Mustache.render(template, data);
            return html;
        },

        render: function () {
            this.trigger('before:render');
            if (_.isFunction(this.renderView)) {
                this.renderView.apply(this, arguments);
            }
            this.trigger('render');
            if (this.rendered) {
                this.trigger('refresh');
            }
            this.rendered = true;
        },
        
        appendToDom: function (parentElement) {
            if (!this.rendered) {
                throw new Error('View not rendered yet. Cannot add to page.');
            }
            this.trigger('before:show');
            $(parentElement).append(this.$el);
            this.trigger('show');
        },
        
        addChildView: function(parentElement, view) {
            var uid = (view.model || view.collection).cid;
            $(parentElement).append(view.$el);
            this.childViews[uid] = view;
        },
        
        remove: function () {
            this.trigger('before:remove');
            this.removeChildren();
            Backbone.View.prototype.remove.apply(this, arguments);
            this.trigger('remove');
        },
        
        removeChildren: function() {
            var views = _.values(this.childViews);
            _.invoke(views, 'remove');
            this.childViews = [];
        }
    });
});