/**
 * Created by sylarhuang on 2017/8/12.
 */
module.exports = function(ngModule) {
    ngModule.factory('MyData', function($websocket) {
        // Open a WebSocket connection
        var dataStream = $websocket('ws://127.0.0.1:8080');

        var collection = [];
        // this.signal ={data:'111'};
        dataStream.onOpen(function () {
            console.log('connected')
        })

        dataStream.onMessage(function(message) {
            collection.pop()
            collection.push(JSON.parse(message.data));
            // collection[0] = JSON.parse(message.data);
            // this.signal = JSON.parse(message.data)
            // console.log(this.signal)
        });

        var methods = {
            collection:collection,
            // signal: this.signal,
            get: function(command) {
                dataStream.send(JSON.stringify({ action: command }));
            }
        };

        return methods;
    })
}