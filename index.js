const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./models/members');
const { Client, Collection, Intents } = require('discord.js');


//Client
//This is the client that will be used to interact with the Discord API.
//Intents is used to make sure the client can recieve different types of data form Discord API.
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
});

//Database
//Use client.database.(whatever database name you want) to access the database.
//For example you could make a schema for bot information and name it botInfo and use client.database.botInfo to access it.

const modelPath = path.join(__dirname, 'models');
const modelFiles = fs.readdirSync(modelPath).filter(file => file.endsWith('.js'));
client.database = {};

for (const file of modelFiles) {
    const models = require(path.join(modelPath, file));
    client.database[models.cmdName] = models.model;
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

//Slash Commands
//Use client.slashCommands.get(commandName) to get the command.

client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
    const command = require(path.join(slashCommandsPath, file));
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.slashCommands.set(command.data.name, command);
}

//Normal Commands
//Use client.commands.get(commandName) to get the command.

client.guild = {};

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.name, command);
}

//Events

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) { client.once(event.name, (...args) => event.execute(...args, client)); }
    else { client.on(event.name, (...args) => event.execute(...args, client)); }
}

//Login

client.login(process.env.BOT_TOKEN)