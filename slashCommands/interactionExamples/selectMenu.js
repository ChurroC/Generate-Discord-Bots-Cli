const {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle: { Secondary },
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("selectmenu")
        .setDescription("Replies with Pong!")
        .setDMPermission(true),
    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("select_id")
                .setPlaceholder("Nothing selected")
                .setMinValues(1)
                .setMaxValues(3)
                .addOptions(
                    {
                        label: "Select me",
                        description: "This is a description",
                        value: "first_option",
                    },
                    {
                        label: "You can select me too",
                        description: "This is also a description",
                        value: "second_option",
                    },
                    {
                        label: "I am also an option",
                        description: "This is a description as well",
                        value: "third_option",
                    }
                )
        );
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("hi_button")
                .setLabel("I say hi!")
                .setStyle(Secondary)
        );
        const row3 = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("select_wow")
                .setPlaceholder("Nothing selected")
                .setMinValues(2)
                .setMaxValues(3)
                .addOptions(
                    {
                        label: "Ice cream",
                        description: "This is a description",
                        value: "first_option",
                    },
                    {
                        label: "Bread",
                        description: "This is also a description",
                        value: "second_option",
                    },
                    {
                        label: "Cereal",
                        description: "This is a description as well",
                        value: "third_option",
                    }
                )
        );
        await interaction.reply({
            content: "Pong!",
            components: [row, row2, row3],
        });
    },
    button: {
        async hiButton(interaction) {
            await interaction.reply(`Hi ${interaction.user.username}!`);
        },
    },
    selectMenu: {
        // Custom Id of the select menu
        selectId: {
            // You shoudldn't be replying to menu changes but you should use update to change the message.
            // If you do need to use the replied variable you should use select_id() instead of select_id: {}
            // Shoud be used mostly for updating
            async firstOption(interaction, client, db, replied) {
                if (replied) {
                    await interaction.followUp(
                        "You selected the first option!"
                    );
                } else {
                    await interaction.reply("You selected the first option!");
                    console.log("firstDone");
                }
            },
            async second_option(interaction, client, db, replied) {
                if (replied) {
                    await interaction.followUp(
                        "You selected the second option!"
                    );
                } else {
                    await interaction.reply("You selected the second option!");
                }
            },
            async thirdOption(interaction, client, db, replied) {
                if (replied) {
                    await interaction.followUp(
                        "You selected the second option!"
                    );
                } else {
                    await interaction.reply("You selected the second option!");
                }
            },
        },
        // If you have one option only sleectable for each menu use a function or when each options add together liek below to form an array of options.
        async selectWow(interaction, client, db, values) {
            const array = [];
            values.forEach(element => {
                if (element === "first_option") {
                    array.push("Chocalate ice cream");
                    array.push("Vanilla ice cream");
                }
                if (element === "second_option") {
                    array.push("Chocalate bread");
                    array.push("Vanilla bread");
                }
                if (element === "third_option") {
                    array.push("Chocalate Cereal");
                    array.push("Vanilla Cereal");
                }
            });
            await interaction.update(
                `Here are your options \n${array.join("\n")}`
            );
        },
    },
};
