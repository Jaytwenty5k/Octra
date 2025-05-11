// work.js
const { SlashCommandBuilder } = require('discord.js');

let economyData = {};  // Temporäre Datenbank für User-Geld
let lastWork = {};     // Speichert, wann der Nutzer zuletzt gearbeitet hat

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Verdiene durch Arbeit Geld!'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const currentTime = Date.now();

    // Überprüfen, ob der Nutzer kürzlich gearbeitet hat
    if (lastWork[userId] && currentTime - lastWork[userId] < 3600000) {  // 1 Stunde in ms
      return interaction.reply({
        content: 'Du hast bereits in den letzten Stunden gearbeitet. Versuche es später nochmal!',
        ephemeral: true,
      });
    }

    // Geld verdienen
    const earnedAmount = Math.floor(Math.random() * 100) + 50;  // Verdiene zwischen 50 und 150 Coins
    economyData[userId] = (economyData[userId] || 0) + earnedAmount;
    lastWork[userId] = currentTime;

    await interaction.reply({
      content: `Du hast durch Arbeit **${earnedAmount} Coins** verdient!`,
    });
  },
};