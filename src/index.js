
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sheepbot:P52t1cUNWvYW4xSZ@botstuff.mmtum.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => console.log('Connected To Database'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));


(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();

