// src/index.js

// Importiere benötigte Module
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialisiere Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
module.exports = { supabase };

// Initialisiere den Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Commands Sammlung
client.commands = new Collection();

// Rekursive Funktion zum Laden der Commands aus allen Unterordnern
function loadCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            loadCommands(fullPath);  // Rekursiv weitersuchen
        } else if (file.endsWith('.js')) {
            try {
                const command = require(path.resolve(fullPath));
                if (command.data && command.data.name) {
                    client.commands.set(command.data.name, command);
                    console.log(`✅ Befehl geladen: ${command.data.name}`);
                } else {
                    console.warn(`⚠️ Warnung: Die Datei ${file} enthält keinen gültigen Command.`);
                }
            } catch (error) {
                console.error(`❌ Fehler beim Laden der Datei ${fullPath}:`, error);
            }
        }
    }
}

// Lade die Commands aus dem Ordner './src/commands'
loadCommands('./src/commands');

// Event-Handler: Wenn der Bot eingeloggt ist
client.once('ready', () => {
    console.log('🤖 Bot ist eingeloggt und bereit!');
});

// Event-Handler: Wenn eine Interaktion (Slash-Command) erfolgt
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;  // Nur Slash-Commands behandeln

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.warn(`⚠️ Unbekannter Command: ${interaction.commandName}`);
        return;
    }

    try {
        // Führe den Command aus und übergib Supabase als Parameter
        await command.execute(interaction, supabase);
        console.log(`✅ Command ausgeführt: ${interaction.commandName}`);
    } catch (error) {
        console.error(`❌ Fehler beim Ausführen des Befehls ${interaction.commandName}:`, error);
        try {
            await interaction.reply({ 
                content: 'Ein Fehler ist beim Ausführen des Befehls aufgetreten.',
                ephemeral: true  // Nur für den Benutzer sichtbar
            });
        } catch (replyError) {
            console.error(`❌ Fehler beim Senden der Fehlermeldung:`, replyError);
        }
    }
});

// Bot mit Token einloggen
client.login(process.env.TOKEN)
    .then(() => console.log('🔑 Erfolgreich eingeloggt!'))
    .catch(err => console.error('❌ Fehler beim Einloggen:', err));

// Supabase-Verbindung überprüfen
console.log('🔗 Supabase-Client');