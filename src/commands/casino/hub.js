const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('casino-hub')
        .setDescription('Öffnet den Casino-Hub mit verschiedenen Spielen.'),
        
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🎰 Casino Hub')
            .setDescription('Wähle ein Spiel aus:')
            .setColor('Gold');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('automaten')
                    .setLabel('🎰 Automat')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('blackjack')
                    .setLabel('🃏 Blackjack')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('roulette')
                    .setLabel('🎡 Roulette')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
};