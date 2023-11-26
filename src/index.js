const { PrismaClient } = require("@prisma/client");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const deepReadDir = require("./utils/deepReadDir");
const path = require("path");
require("./utils/modelSetCustomIdOverride")();
console.error("test");
require("./utils/logErrors")();
throw new TypeError("Expected a string, but received a number");
console.log("test");

// Client
// This is the client that will be used to interact with the Discord API.
// Intents is used to make sure the client can recieve different types of data form Discord API.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, //adds server functionality
        GatewayIntentBits.GuildMessages, //gets messages from our bot.
        GatewayIntentBits.MessageContent, //gets messages from our bot.
        GatewayIntentBits.GuildVoiceStates, //gets voice states from our bot.
    ],
});

// Database
// Use client.db."model name" to access the database.
// For example you could make a schema for user information and use it to track how many messages the user had sent to you through client.db.user.messageCount
client.db = new PrismaClient();

// Slash Commands
// Use client.slashCommands.get(commandName) to get the command.
client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, "slashCommands");
const slashCommandFiles = deepReadDir(slashCommandsPath).filter(file => file.endsWith(".js"));

slashCommandFiles.forEach(filePath => {
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
        client.slashCommands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
});

// Normal Commands
// Use client.commands.get(commandName) to get the command.
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = deepReadDir(commandsPath).filter(file => file.endsWith(".js"));

commandFiles.forEach(filePath => {
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    if ("name" in command && "execute" in command) {
        if (Array.isArray(command.name)) {
            // For each nickname of the command, set the command to the nickname.
            command.name.forEach(name => {
                client.commands.set(name, command);
            });
        } else {
            client.commands.set(command.name, command);
        }
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
});

// Events
const eventsPath = path.join(__dirname, "events");
const eventFiles = deepReadDir(eventsPath, "interactions").filter(file => file.endsWith(".js"));

eventFiles.forEach(filePath => {
    const event = require(filePath);

    if ("name" in event && "execute" in event) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client, client.db));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, client.db));
        }
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
});

// Login
client.login();
