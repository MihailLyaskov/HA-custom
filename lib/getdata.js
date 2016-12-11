var mqtt = require('mqtt');
var soapclient = require('./soapclient');

var GetData = function(config){
	this.Client = mqtt.connect({ host: config.mqtt_broker, port: 1883, username: config.mqtt_user, password: config.mqtt_pass});
	soapclient.login(config.dlink_user, config.dlink_pass, config.dlink_hnap).done(function (status) {
    	if (!status) {
     	   throw "Login failed!";
   	 	}
    	if (status != "success") {
      	  throw "Login failed!";
    	}
	});
	client = this.Client;
	client.on('connect',function(){
		client.subscribe('dht11/data');
	});
};

GetData.prototype.Start = function() {
	client = this.Client;
	client.on('message',function(topic,message){
		
		toJSON = JSON.parse(message);
		client.publish("sensor/temperature",JSON.stringify(toJSON.temp));
		client.publish("sensor/humidity",JSON.stringify(toJSON.hum));
		setTimeout( function(){
			soapclient.consumption().done(function (power) {
				var real_power = power;
				var energy = power/120;
				client.publish("sensor/power",real_power.toString());
				client.publish("sensor/energy",energy.toString());
			});
		},2000);
	});
};

module.exports = GetData;