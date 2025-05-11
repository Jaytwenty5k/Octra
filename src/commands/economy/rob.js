// rob.js
const { SlashCommandBuilder } = require('discord.js');
let economyData = {};  // Temporäre Datenbank für User-Geld

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rob')
    .setDescription('Versuche, Coins von einem anderen Nutzer zu stehlen!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Der Nutzer, den du bestohlen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const robberId = interaction.user.id;
    const victim = interaction.options.getUser('user');
    
    if (robberId === victim.id) {
      return interaction.reply({
        content: 'Du kannst dich selbst nicht bestehlen!',
        ephemeral: true,
      });
    }

    // Überprüfen, ob der Dieb genug Guthaben hat
    const victimBalance = economyData[victim.id] || 0;
    if (victimBalance <= 0) {
      return interaction.reply({
        content: `Der Nutzer **${victim.username}** hat keine Coins zum Stehlen.`,
        ephemeral: true,
      });
    }

    // Chance auf Erfolg oder Misserfolg
    const successChance = Math.random() < 0.5;  // 50% Chance auf Erfolg
    if (successChance) {
      const stolenAmount = Math.floor(Math.random() * victimBalance) + 1;
      economyData[robberId] = (economyData[robberId] || 0) + stolenAmount;
      economyData[victim.id] -= stolenAmount;
      
      await interaction.reply({
        content: `Du hast **${stolenAmount} Coins** von **${victim.username}** gestohlen!`,
      });
    } else {
      await interaction.reply({
        content: `Der Diebstahl ist gescheitert! Du wurdest erwischt!`,
      });
    }
  },
};