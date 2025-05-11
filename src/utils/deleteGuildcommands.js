// src/utils/deleteGuildCommands.js
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Lösche alle Gilden-Commands...');
        const commands = await rest.get(Routes.applicationGuildCommands(clientId, guildId));

        for (const command of commands) {
            await rest.delete(`${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`);
            console.log(`Gilden-Command '${command.name}' gelöscht.`);
        }

        console.log('Alle Gilden-Commands erfolgreich gelöscht!');
    } catch (error) {
        console.error('Fehler beim Löschen der Gilden-Commands:', error);
    }
})();