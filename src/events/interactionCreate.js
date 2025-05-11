const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('../config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;  // Verhindern, dass andere Interaktionen verarbeitet werden

    try {
        // Bestätigt die Interaktion mit "deferUpdate"
        await interaction.deferUpdate();

        // Überprüfen, welche Button-ID geklickt wurde und was damit passieren soll
        if (interaction.customId === 'start_simple') {
            await interaction.editReply({
                content: 'Du hast das einfache Spiel ausgewählt. Viel Spaß!',
                components: [], // Entfernt die Buttons nach Auswahl
            });
        } else if (interaction.customId === 'start_multiplayer') {
            await interaction.editReply({
                content: 'Du hast den Multiplayer-Modus ausgewählt. Warte auf andere Spieler!',
                components: [], // Entfernt die Buttons nach Auswahl
            });
        } else {
            console.warn(`Unbekannte customId: ${interaction.customId}`);
        }
    } catch (error) {
        console.error('Fehler bei der Interaktionsbearbeitung:', error);

        // Fehlerbehandlung bei einem Fehler in der Interaktion
        try {
            await interaction.followUp({
                content: 'Entschuldigung, es gab einen Fehler bei der Bearbeitung der Interaktion. Bitte versuche es später erneut.',
                ephemeral: true,
            });
        } catch (followUpError) {
            console.error('Fehler bei der Follow-Up-Nachricht:', followUpError);
        }
    }
});

client.on('error', console.error);

client.login(token);