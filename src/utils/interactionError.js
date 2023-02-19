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
        // May have happened because if the bot had already replied to the interaction then it did it's job but we report there
        // might still be an error like you don't know if a databse after the message errored out.
        await interaction.followUp({
            content: replyFollowUp,
            ephemeral: true,
        });
    }
};
