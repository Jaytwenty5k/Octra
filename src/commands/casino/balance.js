// src/commands/casino/balance.js
const { supabase } = require('../../supabaseClient');  // Der richtige Import des Supabase-Clients

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Zeigt den aktuellen Kontostand an.'),

  async execute(interaction) {
    const userId = interaction.user.id;

    const { data, error } = await supabase
      .from('users')  // Hier wird die 'users'-Tabelle angesprochen
      .select('balance, currency')  // Abfrage der Balance und der Währung
      .eq('discord_id', userId)  // Finde den User anhand seiner Discord-ID
        // Nur ein Ergebnis erwarten

    if (error || !data) {
      return interaction.reply('Es gab ein Problem beim Abrufen deiner Daten oder du hast noch kein Konto.');
    }

    const balanceEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle(`${interaction.user.username}'s Balance`)
      .addFields(
        { name: 'Währung', value: data.currency || 'Nicht gesetzt', inline: true },
        { name: 'Kontostand', value: `${data.balance} ${data.currency}`, inline: true }
      )
      .setFooter({ text: 'Balance System', iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    interaction.reply({ embeds: [balanceEmbed] });
  },
};