const { REST, Routes } = require('discord.js');
const { config_bot } = require('../src/sql/config.json');
const fs = require('fs');
const commands = [];

module.exports = async (client) => {

    const SlashsArray = []

    fs.readdir('./src/Commands', (error ,folder) => {
        folder.forEach(subfolder => {
            fs.readdir(`./src/Commands/${subfolder}`, (error, files) => {
                files.forEach(files => {
                    if(!files?.endsWith('.js')) return;
                    files = require(`../src/Commands/${subfolder}/${files}`);
                    if (!files?.data.name) return;
                    client.commands.set(files?.data.name, files)
                    commands.push(files?.data)
                })
            })
        })
    });


    fs.readdir('./src/Events/', (erro, pastas) => {
        pastas.forEach((subpasta) => {
          fs.readdir(`./src/Events/${subpasta}/`, (erro, arquivos) => {
            arquivos.forEach((arquivo) => {
              if (!arquivo.endsWith('.js')) return;
              const event = require(`../src/Events/${subpasta}/${arquivo}`);
            //   if (event.once) {
            //         client.once(event.name, (...args) => event.execute(...args, client));
            //   } else {
            //         client.on(event.name, (...args) => event.execute(...args,client));
            //   }
            });
          });
        });
    });

    const rest = new REST({ version: '10' }).setToken(config_bot.token);
    client.on("ready", async () => {
        (async () => {
            try {
                console.log(`✅ - [comandos] ${commands.length} carregado`);
                const data = await rest.put(
                    Routes.applicationCommands(config_bot.clientId),
                    { body: commands },
                );

            } catch (error) {
                console.error(error);
            }
        })();
    });
};