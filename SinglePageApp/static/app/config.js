var require = {

    baseUrl: '/static/app',

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backboneNested: ['backbone'],
        mustache: {
            exports: 'Mustache'
        },
        postal: ['underscore']
    },

    paths: {
        //core: '/static/core',
        underscore: '/static/lib/underscore',
        mustache: '/static/lib/mustache',
        postal: '/static/lib/postal',
        jquery: '/static/lib/jquery',
        backbone: '/static/lib/backbone',
        backboneNested: '/static/lib/backbone-nested',
        text: '/static/lib/require/plugins/text',
        use: '/static/lib/require/plugins/use',
        css: '/static/lib/require/plugins/css',
        normalize: '/static/lib/require/plugins/normalize'
    }
};