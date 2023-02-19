const {
    Events: { InteractionCreate },
} = require("discord.js");
const isChatInput = require("./interactions/isChatInput");
const isAutocomplete = require("./interactions/isAutocomplete");
const isButton = require("./interactions/isButton");
const isSelectMenu = require("./interactions/isSelectMenu");
const isModalSubmit = require("./interactions/isModalSubmit");
const isContext = require("./interactions/isContext");

module.exports = {
    name: InteractionCreate,
    async execute(interaction, client, db) {
        // Add guild to db
        if (!interaction.guild.prefix) {
            // Load prefix into cache
            const guild = await db.guild.upsert({
                where: {
                    guildId: interaction.guild.id,
                },
                update: {},
                create: {
                    guildId: interaction.guild.id,
                },
            });
            interaction.guild.prefix = guild.prefix;
        }
        // Add member to db
        if (client.users.cache.get(interaction.member.id)) {
            await db.member.upsert({
                where: {
                    memberId: interaction.member.id,
                },
                update: {},
                create: {
                    memberId: interaction.member.id,
                },
            });
        }
        if (interaction.isChatInputCommand()) {
            await isChatInput(interaction, client, db);
        } else if (interaction.isAutocomplete()) {
            await isAutocomplete(interaction, client, db);
        } else if (interaction.isButton()) {
            await isButton(interaction, client, db);
        } else if (interaction.isStringSelectMenu()) {
            await isSelectMenu(interaction, client, db);
        } else if (interaction.isModalSubmit()) {
            await isModalSubmit(interaction, client, db);
        } else if (interaction.isContextMenuCommand()) {
            await isContext(interaction, client, db);
        }
    },
};
