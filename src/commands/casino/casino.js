const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('casino')
        .setDescription('Casino Befehle anzeigen'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle('🎰 Casino-Hub')
            .setDescription('Wähle ein Spiel aus:')
            .addFields(
                { name: 'Automat', value: 'Drehe am Spielautomaten und gewinne!' },
                { name: 'Blackjack', value: 'Fordere den Dealer im Blackjack heraus!' }
            )
            .setFooter({ text: 'Wähle ein Spiel aus, um loszulegen!' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('automaten')
                    .setLabel('🎰 Automat')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('blackjack')
                    .setLabel('🃏 Blackjack')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};