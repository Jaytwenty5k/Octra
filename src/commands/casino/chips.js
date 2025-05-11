const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chips')
        .setDescription('Zeigt deine Chip-Anzahl an und bietet Optionen zum Kaufen/Verkaufen.'),
    async execute(interaction) {
        const user = interaction.user;

        // Beispielhafte Chip-Anzahl (später aus der Datenbank)
        const chips = 100;

        const embed = createEmbed(
            'Chip-Konto',
            `🎲 ${user.username} hat derzeit **${chips} Chips**.`,
            '#FFD700'
        );

        // Buttons zum Kaufen und Verkaufen
        const buyButton = new ButtonBuilder()
            .setCustomId('buy_chips')
            .setLabel('Chips kaufen')
            .setStyle(ButtonStyle.Success);

        const sellButton = new ButtonBuilder()
            .setCustomId('sell_chips')
            .setLabel('Chips verkaufen')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(buyButton, sellButton);

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};