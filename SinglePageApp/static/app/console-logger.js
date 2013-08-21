define(['bus'],
    function (bus) {
        
        function logError(msg, envelope) {
            console.error('[%f] - %s', new Date().getTime() / 1000, msg);
        }
        
        function logInfo(msg, envelope) {
            console.log('[%f] - %s', new Date().getTime() / 1000, msg);
        }
        
        //wire up all command handlers
        bus.subscribe(bus.channels.logger, 'error', logError);
        bus.subscribe(bus.channels.logger, 'info', logInfo);
    }
);