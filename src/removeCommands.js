// src/remove-commands.js
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🔄 Entferne ALLE Commands...');
        
        // Entferne globale Commands
        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('✅ Alle globalen Commands erfolgreich entfernt.');
        
        // Entferne gildenweite Commands
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
        console.log('✅ Alle Gilden-Commands erfolgreich entfernt.');
        
        console.log('✨ Commands erfolgreich bereinigt!');
    } catch (error) {
        console.error('❌ Fehler beim Entfernen der Commands:', error);
    }
})();