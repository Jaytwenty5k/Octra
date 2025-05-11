// automat.js
const { SlashCommandBuilder } = require('discord.js');

// Einfache temporäre Datenbank für User-Geld
let economyData = {};  

module.exports = {
  data: new SlashCommandBuilder()
    .setName('automaten')
    .setDescription('Drehe am Spielautomaten!')
    .addIntegerOption(option => 
      option.setName('bet')
        .setDescription('Setze deinen Betrag für das Spiel.')
        .setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const betAmount = interaction.options.getInteger('bet');

    // Überprüfen, ob der Nutzer genug Geld hat
    if ((economyData[userId] || 0) < betAmount) {
      return interaction.reply({
        content: 'Du hast nicht genug Coins, um zu spielen.',
        ephemeral: true,
      });
    }

    // Simuliere das Ergebnis des Automaten (drei zufällige Symbole)
    const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇'];
    const spinResult = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    // Bestimme, ob der Nutzer gewonnen hat
    const uniqueSymbols = new Set(spinResult);
    let result = '';
    if (uniqueSymbols.size === 1) {
      economyData[userId] += betAmount * 5;  // Gewinner bekommt den 5-fachen Einsatz
      result = `Du hast gewonnen! Deine Drehung: ${spinResult.join(' ')}.`;
    } else {
      economyData[userId] -= betAmount;  // Verlierer verliert den Einsatz
      result = `Du hast verloren. Deine Drehung: ${spinResult.join(' ')}.`;
    }

    await interaction.reply({
      content: result,
    });
  },
};

