// src/commands/buychips.js
const { SlashCommandBuilder } = require('discord.js');
const { supabase } = require('../../database/supabase.js'); // Pfad prüfen

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buychips')
    .setDescription('Kaufe Chips mit deinem Guthaben.')
    .addIntegerOption(option => 
      option.setName('amount')
        .setDescription('Anzahl der Chips, die du kaufen möchtest')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    try {
      const discordId = interaction.user.id;
      const amount = interaction.options.getInteger('amount');

      // Guthaben des Benutzers überprüfen
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', discordId)
        .single();

      if (walletError || !wallet) {
        console.error(walletError);
        return interaction.reply({ content: 'Du hast noch kein Wallet oder ein Fehler ist aufgetreten.', ephemeral: true });
      }

      if (wallet.balance < amount) {
        return interaction.reply({ content: 'Du hast nicht genug Guthaben, um diese Chips zu kaufen!', ephemeral: true });
      }

      // Chips kaufen: Balance reduzieren und Chips hinzufügen
      const { data: updatedWallet, error: updateError } = await supabase
        .from('wallets')
        .update({ balance: wallet.balance - amount })
        .eq('user_id', discordId)
        .select('balance');  // Nach dem Update die Balance holen

      if (updateError) {
        console.error(updateError);
        return interaction.reply({ content: 'Ein Fehler ist beim Aktualisieren des Guthabens aufgetreten.', ephemeral: true });
      }

      // Hier kannst du dann eine Chips-Tabelle updaten oder eine andere Logik anwenden

      return interaction.reply({ content: `Du hast **${amount} Chips** gekauft! Dein neues Guthaben: **${updatedWallet[0].balance} Coins**`, ephemeral: true });

    } catch (err) {
      console.error('Unerwarteter Fehler:', err);
      return interaction.reply({ content: 'Ein unerwarteter Fehler ist aufgetreten.', ephemeral: true });
    }
  },
};