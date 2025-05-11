// daily.js
const { SlashCommandBuilder } = require('discord.js');

let economyData = {};  // Temporäre Datenbank für User-Geld
let lastDaily = {};    // Speichert die letzte Belohnung für den Nutzer

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Hol dir deine tägliche Belohnung!'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const currentTime = Date.now();

    // Überprüfen, ob der Nutzer heute schon eine Belohnung abgeholt hat
    if (lastDaily[userId] && currentTime - lastDaily[userId] < 86400000) {  // 24 Stunden in ms
      return interaction.reply({
        content: 'Du hast deine tägliche Belohnung schon abgeholt. Versuche es später noch einmal!',
        ephemeral: true,
      });
    }

    // Belohnung auszahlen
    const reward = 100;  // Beispiel-Belohnung
    economyData[userId] = (economyData[userId] || 0) + reward;
    lastDaily[userId] = currentTime;

    await interaction.reply({
      content: `Du hast deine tägliche Belohnung von **${reward} Coins** erhalten!`,
    });
  },
};