module.exports = async function interactionError(
    interaction,
    reply = "There was an error trying to run the command!",
    replyFollowUp = "An error may have occured with the bot!"
) {
    if (!interaction.replied) {
        await interaction.reply({
            content: reply,
            ephemeral: true,
        });
    } else {
        await interaction.followUp({
            content: replyFollowUp,
            ephemeral: true,
        });
    }
};
