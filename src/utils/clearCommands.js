// src/utils/clearCommands.js
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../config.json');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Lösche globale Commands...');
        const commands = await rest.get(Routes.applicationCommands(clientId));
        
        for (const command of commands) {
            await rest.delete(`${Routes.applicationCommands(clientId)}/${command.id}`);
            console.log(`Gelöscht: ${command.name}`);
        }

        console.log('Alle globalen Commands wurden erfolgreich gelöscht.');
    } catch (error) {
        console.error('Fehler beim Löschen der Commands:', error);
    }
})();