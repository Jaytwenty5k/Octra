// src/deploy-commands.js
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('fs');
const path = require('path');
const commands = [];

// Funktion zum rekursiven Durchsuchen von Ordnern
function readCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Ordner rekursiv durchsuchen
            readCommands(fullPath);
        } else if (file.endsWith('.js')) {
            try {
                const command = require(path.resolve(fullPath));
                if (command.data && command.data.name) {
                    commands.push(command.data.toJSON());
                    console.log(`Slash-Command geladen: ${command.data.name}`);
                } else {
                    console.warn(`Die Datei ${file} enthält keinen gültigen Command.`);
                }
            } catch (error) {
                console.error(`Fehler beim Laden der Datei ${fullPath}:`, error);
            }
        }
    }
}

// Startpunkt des Scan-Vorgangs
readCommands('./src/commands');
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        // Globale Commands registrieren
        console.log('🌍 Registriere globale Commands...');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );
        console.log('✅ Globale Commands erfolgreich registriert!');
    } catch (error) {
        console.error('❌ Fehler beim Registrieren der Slash-Commands:', error);
    }
})();