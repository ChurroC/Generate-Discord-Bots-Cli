const {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle: { Secondary },
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("select_menu")
        .setDescription("Replies with Pong!")
        .setDMPermission(true),
    async execute(interaction) {
        // By setting min and max values you can allow them to choose multiple options
        // Each menu is 1 whole row
        // Since you can have 5 rows you can have at max 5 menus
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("select id")
                .setPlaceholder("Nothing selected")
                .setMinValues(1)
                .setMaxValues(3)
                .addOptions(
                    {
                        label: "Select me",
                        description: "This is a description",
                        value: "first",
                    },
                    {
                        label: "You can select me too",
                        description: "This is also a description",
                        value: "second option",
                    },
                    {
                        label: "I am also an option",
                        description: "This is a description as well",
                        value: "third option",
                    }
                )
        );
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("hi button")
                .setLabel("I say hi!")
                .setStyle(Secondary)
        );
        const row3 = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("select wow")
                .setPlaceholder("Nothing selected")
                .setMinValues(2)
                .setMaxValues(3)
                .addOptions(
                    {
                        label: "Ice cream",
                        description: "This is a description",
                        value: "first option",
                    },
                    {
                        label: "Bread",
                        description: "This is also a description",
                        value: "second option",
                    },
                    {
                        label: "Cereal",
                        description: "This is a description as well",
                        value: "third option",
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
    // If you want to change default behavior of select menu works you can just do selectMenu(interaction, client, db, customId)
    selectMenu: {
        // Custom Id of the select menu
        // If you want to change the default behavior of the select menu you can just do idOfMenu(interaction, client, db, values) remeber values is an array
        selectId: {
            // When you use the the select menu you shouldn't be replying and instead updating the message
            // If you do need to use the reply you should use replied param to check if it has already been replied to in which case you followUp
            // You could also change the selectId into a function like below
            async first(interaction, client, db, replied) {
                if (replied) {
                    await interaction.followUp(
                        "You selected the first option!"
                    );
                } else {
                    await interaction.reply("You selected the first option!");
                    console.log("firstDone");
                }
            },
            async secondOption(interaction, client, db, replied) {
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
        // If you have one option only selection for each menu use a function or when each options works together like below to form an array of options
        async selectWow(interaction, client, db, values) {
            const array = [];
            values.forEach(element => {
                if (element === "first option") {
                    array.push("Chocalate ice cream");
                    array.push("Vanilla ice cream");
                }
                if (element === "second option") {
                    array.push("Chocalate bread");
                    array.push("Vanilla bread");
                }
                if (element === "third option") {
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
