const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

//Client
//This is the client that will be used to interact with the Discord API.
//Intents is used to make sure the client can recieve different types of data form Discord API.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, //adds server functionality
        GatewayIntentBits.GuildMessages, //gets messages from our bot.
        GatewayIntentBits.MessageContent, //gets messages from our bot.
    ],
});

//Database
//Use client.database."model name" to access the database.
//For example you could make a schema for bot information and name it botInfo and use client.database.botInfo to access it.

// const prisma = new PrismaClient();
// const modelPath = path.join(__dirname, 'models');
// const modelFiles = fs
//     .readdirSync(modelPath)
//     .filter(file => file.endsWith('.js'));
client.db = new PrismaClient();

// modelFiles.forEach(file => {
//     const models = require(path.join(modelPath, file));
//     client.database[models.cmdName] = models.model;
// });

// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(console.log('Connected to MongoDB'))
//     .catch(err => console.log(err));

//Slash Commands
//Use client.slashCommands.get(commandName) to get the command.
client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs
    .readdirSync(slashCommandsPath)
    .filter(file => file.endsWith('.js'));

slashCommandFiles.forEach(file => {
    const filePath = path.join(slashCommandsPath, file);
    const command = require(path.join(filePath));
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.slashCommands.set(command.data.name, command);
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
});

//Normal Commands
//Use client.commands.get(commandName) to get the command.
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(path.join(filePath));
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    if ('name' in command && 'execute' in command) {
        client.commands.set(command.name, command);
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
});

//Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith('.js'));

eventFiles.forEach(file => {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
});

//Login
client.login(process.env.BOT_TOKEN);
