const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("guide")
        .setDescription("Search discordjs.guide!")
        .addStringOption(option =>
            option
                .setName("query")
                .setDescription("Phrase to search for")
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName("version-for-query")
                .setDescription("Phrase to search for")
                .setAutocomplete(true)
        ),
    async execute(interaction) {
        interaction.reply("Autocomplete done!");
    },
    // If you want to change default behavior of autocomplete you can just do autocomplete(interaction, client, db, { value, name }) value and name are from focusedOption
    // If you have the id as name1_name2 you can either do name1_name2 or name1Name2 which is preferred
    autocomplete: {
        // Name must be the same as the option name
        // You can just use an array of strings for the autocomplete options
        query: [
            "Popular Topics: Threads",
            "Sharding: Getting started",
            "Library: Voice Connections",
            "Interactions: Replying to slash commands",
            "Popular Topics: Embed preview",
        ],
        // You can use a function to generate the autocomplete options
        // You can use version_for_query as but it's prefered to use camelCase
        async versionForQuery(interaction, client, db) {
            const query = interaction.options.getString("query");
            const versions = ["v9", "v11", "v12", "v13", "v14"];
            if (query) {
                return versions.map(v => `${query} ${v}`);
            } else {
                return versions;
            }
        },
    },
};
