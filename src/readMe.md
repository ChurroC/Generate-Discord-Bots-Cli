This is a simple way to start to build a discord bot. All you have to do is just
add commands and Slash Commands to the appropriate folders . Also remeber to add
BOT_TOKEN, GUILD_ID, and CLIENT_ID. Run npm deploy to deploy to deploy the slash
commands to the server.

Also have database or cache mode

Add a musivoic option with a cli that adds it for you

add a cli comamdn to convert to sharding easy.

Add a logger

Maybe get model based of snowflake Spent like 3 hours doing stuff to mdify
classes and when I finally finsihe it I realized it's to wierd to import
something from a file and not discord and add interaciotn as param so yeah just
force them to use interaction.commandName as customID or until I get a better
idea

Still need to add voice

Add subcommand group support in subcomand.js

Also make music a subcommand automatically.

Maybe have an object for all the function params so I cold do this
async execute({ interaction, user })
instead of 
async execute(interaction, client, db, user)

subcommandGroup needed
if bot couldnt join vc reply with error
maybe fix deepreaddir