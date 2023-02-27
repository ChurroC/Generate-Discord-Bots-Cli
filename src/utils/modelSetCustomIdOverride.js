const { ModalBuilder } = require("discord.js");

module.exports = () => {
    ModalBuilder.prototype.setCustomId = function (customId, interaction) {
        if (interaction) {
            this.data.custom_id = `${customId},${
                interaction.commandName ||
                interaction.message.interaction.commandName
            }`;
        } else {
            console.error(
                "You must add a param of interaction to the ModalBuilder else your modal will not be recieved!"
            );
        }
        return this;
    };
};
