const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Lösche alle Commands...');

        // Lösche globale Commands
        const globalCommands = await rest.get(Routes.applicationCommands(clientId));
        for (const command of globalCommands) {
            await rest.delete(Routes.applicationCommand(clientId, command.id));
            console.log(`Gelöscht: Globaler Command "${command.name}"`);
        }

        // Lösche gilden-spezifische Commands
        const guildCommands = await rest.get(Routes.applicationGuildCommands(clientId, guildId));
        for (const command of guildCommands) {
            await rest.delete(Routes.applicationGuildCommand(clientId, guildId, command.id));
            console.log(`Gelöscht: Guild-Command "${command.name}"`);
        }

        console.log('Alle Commands erfolgreich gelöscht!');
    } catch (error) {
        console.error('Fehler beim Löschen der Commands:', error);
    }
})();