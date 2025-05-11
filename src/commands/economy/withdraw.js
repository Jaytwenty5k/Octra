// withdraw.js
const { SlashCommandBuilder } = require('discord.js');

let economyData = {};  // Temporäre Datenbank für User-Geld
let bankData = {};      // Temporäre Bankdaten für User

module.exports = {
  data: new SlashCommandBuilder()
    .setName('withdraw')
    .setDescription('Hebe Geld von deiner Bank ab.')
    .addIntegerOption(option => 
      option.setName('amount')
        .setDescription('Die Anzahl der Coins, die du abheben möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const amount = interaction.options.getInteger('amount');

    // Überprüfen, ob der Nutzer genug Geld auf der Bank hat
    if ((bankData[userId] || 0) < amount) {
      return interaction.reply({
        content: 'Du hast nicht genug Geld auf der Bank, um diese Abhebung vorzunehmen.',
        ephemeral: true,
      });
    }

    // Geld von der Bank zurück auf die Wallet übertragen
    bankData[userId] -= amount;
    economyData[userId] = (economyData[userId] || 0) + amount;

    await interaction.reply({
      content: `Du hast **${amount} Coins** von deiner Bank abgehoben.`,
    });
  },
};