// deposit.js
const { SlashCommandBuilder } = require('discord.js');

let economyData = {};  // Temporäre Datenbank für User-Geld
let bankData = {};      // Temporäre Bankdaten für User

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Zahle Geld auf deine Bank ein.')
    .addIntegerOption(option => 
      option.setName('amount')
        .setDescription('Die Anzahl der Coins, die du einzahlen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const amount = interaction.options.getInteger('amount');

    // Überprüfen, ob der Nutzer genug Geld hat
    if ((economyData[userId] || 0) < amount) {
      return interaction.reply({
        content: 'Du hast nicht genug Coins, um diese Einzahlung vorzunehmen.',
        ephemeral: true,
      });
    }

    // Geld von der normalen Wallet auf die Bank übertragen
    economyData[userId] -= amount;
    bankData[userId] = (bankData[userId] || 0) + amount;

    await interaction.reply({
      content: `Du hast **${amount} Coins** auf deine Bank eingezahlt.`,
    });
  },
};