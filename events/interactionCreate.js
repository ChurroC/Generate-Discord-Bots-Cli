const {
    Events: { InteractionCreate },
} = require("discord.js");

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
            const command = client.slashCommands.get(
                process.env.ENV !== "production"
                    ? interaction.commandName.slice(0, -4)
                    : interaction.commandName
            );

            if (!command) {
                console.error(
                    `No command matching ${interaction.commandName} was found.`
                );
                return;
            }

            try {
                await command.execute(interaction, client, db);
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content:
                        "There was an error trying to execute that command!",
                    ephemeral: true,
                });
            }
        } else if (interaction.isButton()) {
            console.log(interaction.customId);
            console.log(interaction.component);
            console.log(interaction.id);
            console.log();
            const command = client.slashCommands.get(
                process.env.ENV !== "production"
                    ? interaction.message.interaction.commandName.slice(0, -4)
                    : interaction.message.interaction.commandName
            );

            if (!command) {
                console.error(
                    `No button for ${interaction.message.interaction.commandName} was found.`
                );
                return;
            }

            try {
                await command[interaction.customId + "Button"](
                    interaction,
                    client,
                    db
                );
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content: "There was an error trying to press that button!",
                    ephemeral: true,
                });
            }
        } else if (interaction.isSelectMenu()) {
        } else if (interaction.isAutocomplete()) {
        } else if (interaction.isModalSubmit()) {
        } else if (interaction.isModalClose()) {
        }
    },
};
