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
                .setCustomId("select")
                .setPlaceholder("Nothing selected")
                .setMinValues(2)
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
        interaction.reply({
            content: "Pong!",
            components: [row, row2, row3],
        });
    },
    button: {
        async hiButton(interaction) {
            interaction.reply(`Hi ${interaction.user.username}!`);
        },
    },
    selectMenu: {
        // Custom Id of the select menu
        select: {
            async firstOption(interaction, client, db, replied) {
                console.log("replied", replied);
                if (replied) {
                    interaction.followUp("You selected the first option!");
                } else {
                    await interaction.reply("You selected the first option!");
                    console.log("firstDone");
                }
            },
            async secondOption(interaction, client, db, replied) {
                console.log("replied", replied);
                //console.log(replied);
                if (replied) {
                    interaction.followUp("You selected the second option!");
                } else {
                    interaction.reply("You selected the second option!");
                }
            },
        },
        selectWow: {
            async firstOption(interaction) {
                interaction.reply(
                    "You selected the first option on second selection!"
                );
            },
            async secondOption(interaction) {
                interaction.reply(
                    "You selected the second option on second selection!"
                );
            },
        },
    },
};
