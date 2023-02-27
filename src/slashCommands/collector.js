const { SlashCommandBuilder } = require("discord.js");

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName("quiz")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        const item = this.quiz[Math.floor(Math.random() * this.quiz.length)];

        await interaction.reply({ content: item.question, fetchReply: true });
        try {
            const collected = await interaction.channel.awaitMessages({
                filter(response) {
                    return item.answers.some(
                        answer =>
                            answer.toLowerCase() ===
                            response.content.toLowerCase()
                    );
                },
                max: 1,
                time: 30000,
                errors: ["time"],
            });
            await collected
                .first()
                .reply(`${collected.first().author} got the correct answer!`);
        } catch (e) {
            console.error(e);
            await interaction.followUp(
                "Looks like nobody got the answer in time."
            );
        }
    },
    quiz: [
        {
            question: "What color is the sky?",
            answers: ["blue"],
        },
        {
            question: "How many letters are there in the alphabet?",
            answers: ["26", "twenty-six", "twenty six", "twentysix"],
        },
    ],
};
