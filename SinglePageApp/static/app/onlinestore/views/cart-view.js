define(['bus', 'underscore', 'jquery', 'app-view', 'text!../templates/cart.html'],
    function (bus, _, $, AppView, viewTemplate) {
        return AppView.extend({

            initialize: function () {
                AppView.prototype.initialize.apply(this, arguments);

                this.listenTo(this.model, 'add:items remove:items', this.render);
                this.listenTo(this.model, 'change:quantity', this.updateQuantity);
                this.listenTo(this.model, 'change:quantity', this.updateTotal);
            },
            
            events: {
                'click .remove': 'onRemoveClicked'
            },
            
            onRemoveClicked: function(event) {
                var $item = $(event.target).closest('.cart-item'),
                    id = $item.data('productId');
                
                bus.postMessage(bus.channels.ui, 'cart:remove-product', id);
            },

            renderView: function () {
                var cart = this.model.toJSON();
                _.each(cart.items, function(item) { return item.formattedPrice = '$' + item.unitPrice.toFixed(2); });
                this.$el.html(this.inflateTemplate(viewTemplate, cart));
                this.updateTotal();
                return this;
            },

            updateTotal: function() {
                var $totalPrice = this.$('.total-price'),
                    total;

                total = _.reduce(this.model.get('items'), function(sum, item) {
                    return sum + item.unitPrice * item.quantity;
                }, 0);
                $totalPrice.text(total.toFixed(2));
            },
            
            updateQuantity: function(model) {
                var id = model.get('productId'),
                    $qty = this.$('.cart-item[data-product-id=' + id + '] .qty');

                $qty.text(model.get('quantity'));
            }

        });
    }
);
