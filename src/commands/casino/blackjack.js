const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'); // Importiere die richtigen Builder

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackjack')
        .setDescription('Starte eine Runde Blackjack!'),
    
    async execute(interaction) {
        const embed = {
            color: 0x0099ff,
            title: 'Blackjack - Spielstart',
            description: 'Wähle die Anzahl der Spieler oder die Art des Spiels, um zu starten!',
            fields: [
                {
                    name: 'Verfügbare Optionen:',
                    value: '1. Einfaches Spiel\n2. Multiplayer',
                    inline: true,
                },
                {
                    name: 'Regeln:',
                    value: 'Ziel ist es, mit den Karten so nah wie möglich an 21 zu kommen, ohne es zu überschreiten.',
                    inline: false,
                },
            ],
            timestamp: new Date(),
        };
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('start_simple')
                    .setLabel('Einfaches Spiel')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('start_multiplayer')
                    .setLabel('Multiplayer')
                    .setStyle(ButtonStyle.Secondary)
            );
        await interaction.reply({ embeds: [embed], components: [row] });
    },
};