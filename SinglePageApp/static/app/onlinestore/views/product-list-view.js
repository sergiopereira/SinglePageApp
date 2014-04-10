define(['bus', 'underscore', 'jquery', 'app-view', 'text!../templates/product-list.html'],
    function (bus, _, $, AppView, viewTemplate) {
        return AppView.extend({

            initialize: function () {
                AppView.prototype.initialize.apply(this, arguments);

                this.listenTo(this.collection, 'change add remove reset', this.render);
            },
            
            events: {
                'click .add': 'onAddClicked'
            },
            
            onAddClicked: function(event) {
                var $prod = $(event.target).closest('.product'),
                    id = $prod.data('productId'),
                    product = this.collection.get(id);
                
                bus.postMessage(bus.channels.ui, 'cart:add-product', product);
            },

            inflate: _.template(viewTemplate),

            renderView: function () {
                this.$el.html(this.inflate({ items: this.collection.toJSON() }));
                return this;
            }

        });
    }
);
