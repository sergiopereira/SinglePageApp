define(['bus', 'underscore', 'jquery', 'app-view', 'text!../templates/category-list.html'],
    function (bus, _, $, AppView, viewTemplate) {
        return AppView.extend({

            initialize: function () {
                AppView.prototype.initialize.apply(this, arguments);

                this.listenTo(this.collection, 'change add remove reset', this.render);
            },
            
            events: {
                'click .category': 'onCategorySelected'
            },
            
            onCategorySelected: function(event) {
                var $cat = $(event.currentTarget),
                    id = $cat.data('categoryId'),
                    category = this.collection.get(id);
                this.$('.category').removeClass('active');
                $cat.addClass('active');
                bus.postMessage(bus.channels.ui, 'category:selected', category);
                event.preventDefault();
            },

            renderView: function () {
                var items = this.collection.toJSON();
                items[0].selected = true;
                this.$el.html(this.inflateTemplate(viewTemplate, {items: items} ));
                bus.postMessage(bus.channels.ui, 'category:selected', this.collection.at(0));
                return this;
            }

        });
    }
);
