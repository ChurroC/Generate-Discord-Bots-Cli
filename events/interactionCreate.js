const {
    Events: { InteractionCreate },
} = require("discord.js");
const toCamelCase = require("../utils/toCamelCase");

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
                if (interaction.replied) {
                    interaction.followUp({
                        content:
                            "There was an error trying to execute that command!",
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        content:
                            "There was an error trying to execute that command!",
                        ephemeral: true,
                    });
                }
            }
        } else if (interaction.isAutocomplete()) {
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

            const focusedOption = interaction.options.getFocused(true);
            const camelCaseName = toCamelCase(focusedOption.name);

            let array;
            // If camel case try camel case else try  with "_" in name
            const autocompleteCommand = (command.autocomplete[camelCaseName] ||=
                command.autocomplete[focusedOption.name]);
            if (Array.isArray(autocompleteCommand)) {
                array = autocompleteCommand;
            } else {
                array = await autocompleteCommand(interaction, client, db);
            }

            const filtered = array.filter(choice =>
                choice
                    .toLowerCase()
                    .startsWith(focusedOption.value.toLowerCase())
            );

            try {
                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice }))
                );
            } catch (err) {
                console.error(err);
            }
        } else if (interaction.isButton()) {
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

            const camelCaseName = toCamelCase(interaction.customId);

            // If camel case try camel case else try  with "_" in name
            const buttonCommand = (command.button[camelCaseName] ||=
                command.button[interaction.customId]);

            try {
                await buttonCommand(interaction, client, db);
            } catch (err) {
                console.error(err);
                if (interaction.replied) {
                    interaction.followUp({
                        content: "There was an error trying to run the button!",
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        content: "There was an error trying to run the button!",
                        ephemeral: true,
                    });
                }
            }
        } else if (interaction.isStringSelectMenu()) {
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

            const camelCaseName = toCamelCase(interaction.customId);
            // If camel case try camel case else try  with "_" in name
            const selectMenuCommand = (command.selectMenu[camelCaseName] ||=
                command.selectMenu[interaction.customId]);

            try {
                if (typeof selectMenuCommand === "function") {
                    await selectMenuCommand(
                        interaction,
                        client,
                        db,
                        interaction.values
                    );
                } else {
                    for (const value of interaction.values) {
                        const camelCaseValue = value
                            .split("_")
                            .map((word, index) =>
                                index === 0
                                    ? word
                                    : word[0].toUpperCase() + word.slice(1)
                            )
                            .join("");
                        // If camel case try camel case else try  with "_" in name
                        const selectMenuValueCommand = (selectMenuCommand[
                            camelCaseValue
                        ] ||= selectMenuCommand[value]);
                        await selectMenuValueCommand(
                            interaction,
                            client,
                            db,
                            interaction.replied
                        );
                    }
                }
            } catch (err) {
                console.error(err);
                if (interaction.replied) {
                    interaction.followUp({
                        content:
                            "There was an error trying to run the select menu!",
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        content:
                            "There was an error trying to run the select menu!",
                        ephemeral: true,
                    });
                }
            }
        } else if (interaction.isModalSubmit()) {
        } else if (interaction.isMessageContextMenuCommand()) {
        }
    },
};
