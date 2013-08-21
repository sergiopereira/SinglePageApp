define(['bus', 'underscore', 'jquery', 'app-view', 'text!../templates/cart-item.html'],
    function (bus, _, $, AppView, viewTemplate) {
        return AppView.extend({
            tagName: 'li',
            className: 'cart-item',
            
            initialize: function () {
                AppView.prototype.initialize.apply(this, arguments);
                this.listenTo(this.model, 'change:quantity', this.updateQuantity);
            },
            
            events: {
                'click .remove': 'onRemoveClicked'
            },
            
            onRemoveClicked: function(event) {
                var id = this.model.get('productId');
                bus.postMessage(bus.channels.ui, 'cart:remove-product', id);
            },

            inflate: _.template(viewTemplate),

            render: function () {
                this.$el.html(this.inflate(this.model.toJSON()));
                return this;
            },
            
            updateQuantity: function() {
                var $qty = this.$('.qty');

                $qty.text(this.model.get('quantity'));
            }

        });
    }
);
