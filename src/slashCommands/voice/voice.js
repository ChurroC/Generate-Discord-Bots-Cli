const {
    SlashCommandBuilder,
    ChannelType: { GuildVoice },
} = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName("join-vc")
        .setDescription("Joins VC and plays audio")
        .addChannelOption(channel =>
            channel
                .setName("channel")
                .setDescription("Channel to join")
                .addChannelTypes(GuildVoice)
        ),
    async execute(interaction) {
        if (interaction.member.voice.channelId) {
            joinVoiceChannel({
                channelId:
                    interaction.options.getChannel("channel").id ||
                    interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            if (interaction.options.getChannel("channel")) {
                interaction.reply(
                    `Joined VC in ${interaction.options.getChannel("channel")}`
                );
            } else {
                interaction.reply("Joined VC");
            }
        } else {
            interaction.reply(
                "You need to be in a voice channel to use this command!"
            );
        }
    },
};
