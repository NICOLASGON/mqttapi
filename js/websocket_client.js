
var websocketclient = {
    'client': null,
    'lastMessageId': 1,
    'lastSubId': 1,
    'subscriptions': [],
    'messages': [],
    'connected': false,

    'connect': function () {

        var host = $('#urlInput').val();
        var path = $('#pathInput').val();
        var port = parseInt($('#portInput').val(), 10);
        var clientId = "web_" + parseInt(Math.random() * 100, 10)
        var username = $('#userInput').val();
        var password = $('#pwInput').val();
        var keepAlive = parseInt($('#keepAliveInput').val());
        var cleanSession = $('#cleanSessionInput').is(':checked');
        var ssl = $('#sslInput').is(':checked');

        this.client = new Paho.MQTT.Client(host, port, path, clientId);
        this.client.onConnectionLost = this.onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived;

        var options = {
            timeout: 3,
            keepAliveInterval: keepAlive,
            cleanSession: cleanSession,
            useSSL: ssl,
            onSuccess: this.onConnect,
            onFailure: this.onFail
        };

        if (username.length > 0) {
            options.userName = username;
        }
        if (password.length > 0) {
            options.password = password;
        }

        websocketclient.client.connect(options);
    },

    'onConnect': function () {
        websocketclient.connected = true;
        websocketclient.client.subscribe("test/interface", {qos: 0});

        $( "#mqtt_state_indicator" ).html( "Connected" );
        $( "#mqtt_state_indicator" ).removeClass( "badge-info" );
        $( "#mqtt_state_indicator" ).removeClass( "badge-danger" );
        $( "#mqtt_state_indicator" ).addClass( "badge-success" );
    },

    'onFail': function (message) {
        websocketclient.connected = false;
    },

    'onConnectionLost': function (responseObject) {
        websocketclient.connected = false;
        if (responseObject.errorCode !== 0)
        {
          $( "#mqtt_state_indicator" ).html( "Lost connection ..." );
          $( "#mqtt_state_indicator" ).removeClass( "badge-info" );
          $( "#mqtt_state_indicator" ).removeClass( "badge-success" );
          $( "#mqtt_state_indicator" ).addClass( "badge-danger" );
        }
    },

    'onMessageArrived': function (message) {
        $( "#mqtt_message_stream" ).append("<div class=\"mqtt-message mqtt-message-danger\"><span class=\"mqtt-message-title\">" + message.destinationName + "</span>" + message.payloadString + "</div>");
    },

    'disconnect': function () {
        this.client.disconnect();
    },
};
