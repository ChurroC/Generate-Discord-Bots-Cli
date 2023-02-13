const path = require("path");
const { REST, Routes } = require("discord.js");
const deepReadDir = require("./utils/deepReadDir");

const commands = [];
const commandsPath = path.join(__dirname, "slashCommands");
// Grab all the command files from the commands directory you created earlier
const commandFiles = deepReadDir(commandsPath).filter(file =>
    file.endsWith(".js")
);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
commandFiles.forEach(filePath => {
    const command = require(filePath);

    if (process.env.ENV !== "production") {
        command.data.name = `${command.data.name}_dev`;
        command.data.description = command.data.description
            ? `${command.data.description} (dev)`
            : null;
    }

    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
});

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log("Started refreshing application (/) commands.");
        if (process.env.ENV === "production") {
            // Deploy global commands
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                body: commands,
            });
            console.log("Commands Deployed Globally");
        } else {
            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                {
                    body: commands,
                }
            );
            console.log("Commands Deployed Locally");
        }
    } catch (err) {
        console.log(err);
    }
})();
