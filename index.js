// Config
// MQTT Authentication
var MQTTuser = 'mqtt';
var MQTTpass = 'mqtt';

// MQTT Broker Server Connection
var MQTTtopic = '<MQTT Topic>';
var MQTTbroker = 'MQTT IP';
var MQTTport = 1883; // Default 1883

// DSP Connection
var DSPip = '<Audia IP>';
var DSPport = 23; // Default 23 (Should never have to change this)
// End Config

// Requirements
var net = require('net');
var mqtt = require('mqtt'), url = require('url');

// Parse MQTT Server Connection Data
var mqtt_url = url.parse(process.env.CLOUDAMQP_MQTT_URL || 'mqtt://' + MQTTbroker + ':' + MQTTport);
var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;

// Options Setup
var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: MQTTuser,
  password: MQTTpass,
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe(MQTTtopic, function() {
    // when a message arrives, translate to TCP command
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
      
        var client = new net.Socket();

        client.connect(DSPport, DSPip, function() {
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
