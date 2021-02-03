var net = require('net');

var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDAMQP_MQTT_URL || 'mqtt://10.2.10.33:1883');
var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;
//username: auth[0] + ":" + auth[0] if you are on a shared instance
var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "mqtt",
  password: "mqtt",
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('audio/audia/command', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
      
        var client = new net.Socket();

        client.connect(23, '10.2.10.200', function() {
        console.log(`sending to server: a.random.test`);
        client.write(message + `\n`);     
        client.end();                 
        });
    });
  });
  // publish a message to a topic
  //client.publish('hello/world', 'my message', function() {
   // console.log("Message is published");
  //  client.end(); // Close the connection when published
  //});
});