const { SlashCommandBuilder } = require("discord.js");

// This is a command that has autocomplete options
// You can either have an array of strings that will be used for autocomplete options
// Or you can have a function that will be used to generate autocomplete options
// The array or the function must be names the name of the option with camle case and no "_" and appended with "Autocomplete"
// Use can only use _ in the option name if you want to use camel case in the function name

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
                .setName("version_for_query")
                .setDescription("Phrase to search for")
                .setAutocomplete(true)
        ),
    async execute() {},
    autocomplete: {
        query: [
            "Popular Topics: Threads",
            "Sharding: Getting started",
            "Library: Voice Connections",
            "Interactions: Replying to slash commands",
            "Popular Topics: Embed preview",
        ],
        // Also version_for_query works
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
