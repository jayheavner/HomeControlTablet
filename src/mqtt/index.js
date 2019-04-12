import mqtt from 'mqtt';
import mqttEmitter from 'mqtt-emitter';
import isJson from 'is-json';

var events = new mqttEmitter();

var clientId =
  'mqttjs_' +
  Math.random()
    .toString(16)
    .substr(2, 8);

var host = process.env.VUE_APP_MQTT_SERVER;

var options = {
  keepalive: 10,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  username: process.env.VUE_APP_MQTT_USERNAME,
  password: process.env.VUE_APP_MQTT_PASSWORD,
  rejectUnauthorized: false
};

var client = mqtt.connect(host, options);

client.on('error', function(err) {
  console.log(err);
  client.end();
});

client.on('connect', function() {
  console.log(`client connected: ${clientId}`);
  client.subscribe('#', { qos: 0 });
});

client.on('message', function(topic, message) {
  // console.log(`Received mqtt topic > ${topic}`);
  // if (isJson(message)) console.log('This message came as JSON');
  message = message.toString();
  // console.dir(isJson(message) ? JSON.parse(message) : message);
  events.emit(topic, message);
});

client.on('close', function() {
  console.log(`${clientId} disconnected`);
});

export const publish = (topic, msg) => {
  console.log(`publishing ${msg} to ${topic}`);
  client.publish(topic, msg);
};
export const subscribe = (topic, method) => {
  events.on(topic, method);
};
