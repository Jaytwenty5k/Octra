const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Zeigt die Top-5-Spieler mit dem meisten Geld.'),
    async execute(interaction) {
        // Beispielhafte Top-Liste (später aus der Datenbank)
        const leaderboard = [
            { username: 'Player1', coins: 5000 },
            { username: 'Player2', coins: 4500 },
            { username: 'Player3', coins: 4000 },
            { username: 'Player4', coins: 3500 },
            { username: 'Player5', coins: 3000 },
        ];

        let description = leaderboard
            .map((player, index) => `**${index + 1}. ${player.username}** - ${player.coins} Coins`)
            .join('\n');

        const embed = createEmbed(
            '💰 Top 5 Spieler',
            description,
            '#1E90FF'
        );

        await interaction.reply({ embeds: [embed] });
    },
};