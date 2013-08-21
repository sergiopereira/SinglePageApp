define(['postal', 'jquery', 'backbone', 'underscore'],
    function(postal, $, Backbone, _) {

        function uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        
        function publish(channel, topic, msg, extras) {
            var payload = {
                channel: channel,
                topic: topic,
                data: msg
            };
            _.extend(payload, extras);
            postal.publish(payload);
        }

        return _.extend({}, Backbone.Events, {
            channels: {
                ui: 'ui',
                modelData: 'model.data',
                logger: 'logger'
            },
            
            subscribe: function(channel, topic, handler) {
                postal.subscribe({ channel: channel, topic: topic, callback: handler });
            },
            
            postMessage: function (channel, topic, msg) {
                publish(channel, topic, msg);
            },
            
            postCommand: function (channel, topic, msg) {
                var dfd = $.Deferred(),
                    replyTo = {
                        channel: channel,
                        topic: topic + '.' + uuid()
                    };

                //setup listener for response. Single use.
                postal.subscribe({
                    channel: replyTo.channel,
                    topic: replyTo.topic,
                    callback: function(respMsg, envelope) {
                        if (respMsg.error) {
                            dfd.reject(respMsg.error);
                        } else {
                            dfd.resolve(respMsg);
                        }
                    }
                }).once(); // <-- tada!

                publish(channel, topic, msg, { replyTo: replyTo });

                return dfd;
            },

            respond: function (result, originalEnvelope) {
                if (!_.isEmpty(originalEnvelope.replyTo)) {
                    postal.publish({
                        channel: originalEnvelope.replyTo.channel,
                        topic: originalEnvelope.replyTo.topic,
                        data: result
                    });
                }
            }
        });
    }
);