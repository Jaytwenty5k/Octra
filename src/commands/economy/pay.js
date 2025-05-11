// pay.js
const { SlashCommandBuilder } = require('discord.js');

let economyData = {};  // Temporäre Datenbank für User-Geld

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pay')
    .setDescription('Überweist Coins an einen anderen Nutzer.')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Der Nutzer, dem du Coins überweisen möchtest')
        .setRequired(true))
    .addIntegerOption(option => 
      option.setName('amount')
        .setDescription('Die Anzahl der Coins, die du überweisen möchtest')
        .setRequired(true)),
  async execute(interaction) {
    const senderId = interaction.user.id;
    const receiver = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    // Überprüfen, ob der Sender genug Guthaben hat
    if ((economyData[senderId] || 0) < amount) {
      return interaction.reply({
        content: 'Du hast nicht genug Coins, um diese Überweisung durchzuführen.',
        ephemeral: true,
      });
    }

    // Guthaben aktualisieren
    economyData[senderId] -= amount;
    economyData[receiver.id] = (economyData[receiver.id] || 0) + amount;

    await interaction.reply({
      content: `Du hast **${amount} Coins** an **${receiver.username}** überwiesen.`,
    });
  },
};