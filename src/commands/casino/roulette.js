// roulette.js
const { SlashCommandBuilder } = require('discord.js');

// Einfache temporäre Datenbank für User-Geld
let economyData = {};  

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roulette')
    .setDescription('Spiele Roulette im Casino!')
    .addIntegerOption(option => 
      option.setName('bet')
        .setDescription('Setze deinen Betrag für das Spiel.')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('bet_type')
        .setDescription('Wähle, ob du auf eine Zahl oder Farbe setzen möchtest (z.B. "rot" oder "7").')
        .setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const betAmount = interaction.options.getInteger('bet');
    const betType = interaction.options.getString('bet_type').toLowerCase();

    // Überprüfen, ob der Nutzer genug Geld hat
    if ((economyData[userId] || 0) < betAmount) {
      return interaction.reply({
        content: 'Du hast nicht genug Coins, um zu spielen.',
        ephemeral: true,
      });
    }

    // Simuliere das Roulette-Ergebnis
    const rouletteResult = Math.floor(Math.random() * 36);  // Zahl zwischen 0 und 35
    const rouletteColor = rouletteResult % 2 === 0 ? 'rot' : 'schwarz';  // Einfache Farbzuordnung

    // Überprüfen, ob der Nutzer gewonnen hat
    let result = '';
    if (betType === rouletteResult.toString() || betType === rouletteColor) {
      economyData[userId] += betAmount * 2;  // Gewinner bekommt den doppelten Einsatz
      result = `Du hast gewonnen! Das Ergebnis war ${rouletteResult} (${rouletteColor}).`;
    } else {
      economyData[userId] -= betAmount;  // Verlierer verliert den Einsatz
      result = `Du hast verloren. Das Ergebnis war ${rouletteResult} (${rouletteColor}).`;
    }

    await interaction.reply({
      content: result,
    });
  },
};