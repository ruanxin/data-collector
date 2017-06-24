'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const eventSchema = require('./models/eventschema');

mongoose.connect(config.get('mongoose:uri-dev'));

const px = require('phoenix')
const socket = new px.Socket('wss://machinestream.herokuapp.com/api/v1/events', { transport: require('websocket').w3cwebsocket })
socket.connect()

const channel = socket.channel("events", {})
channel.join()
	.receive("error", ({reason}) => {
    	console.log("failed join", reason)
    	process.exit(1);
    })
    .receive("timeout", () => {
    	console.log("Networking issue. Still waiting...")
    	process.exit(1);
	})

channel.on('new', event => {
    eventSchema.update({
        id: event.id
    }, {
    	id: event.id,
        machine_id: event.machine_id,
        timestamp: event.timestamp,
        status: event.status
    }, {
        upsert: true
    }, function(err) {})
    console.log(event)
})
