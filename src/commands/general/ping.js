const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Zeigt den Ping des Bots an'),
  async execute(interaction) {
    const ping = Date.now() - interaction.createdTimestamp;
    
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('🏓 Pong!')
      .setDescription(`Bot-Ping: **${ping}ms**`)
      .setTimestamp()
      .setFooter({ text: 'Octra Bot', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};