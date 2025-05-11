const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Lösche alle Commands...');

        // Globale Commands löschen
        const globalCommands = await rest.get(Routes.applicationCommands(clientId));
        for (const cmd of globalCommands) {
            await rest.delete(Routes.applicationCommand(clientId, cmd.id));
            console.log(`Gelöscht: Globaler Command "${cmd.name}"`);
        }

        // Guild-Commands löschen
        const guildCommands = await rest.get(Routes.applicationGuildCommands(clientId, guildId));
        for (const cmd of guildCommands) {
            await rest.delete(Routes.applicationGuildCommand(clientId, guildId, cmd.id));
            console.log(`Gelöscht: Guild-Command "${cmd.name}"`);
        }

        console.log('Alle Commands erfolgreich gelöscht!');
    } catch (error) {
        console.error('Fehler beim Löschen der Commands:', error);
    }
})();