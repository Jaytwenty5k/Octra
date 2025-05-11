const { SlashCommandBuilder } = require('discord.js');
const { supabase } = require('../../database/supabase.js'); // Importiere die Supabase-Verbindung

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registriere deinen Account!'),
    async execute(interaction) {
        const userId = interaction.user.id; // Discord-Benutzer-ID
        const { data, error } = await supabase
            .from('users')
            .select('discord_id')
            .eq('discord_id', userId)
            .single();

        if (error) {
            console.error('Fehler beim Überprüfen des Benutzers:', error);
            return interaction.reply({
                content: 'Es gab einen Fehler bei der Überprüfung des Benutzers.',
                ephemeral: true,
            });
        }

        if (data) {
            // Benutzer existiert bereits
            return interaction.reply({
                content: `Du bist bereits registriert!`,
                ephemeral: true,
            });
        } else {
            // Benutzer existiert nicht, registriere ihn
            const { error: insertError } = await supabase
                .from('users')
                .insert([{ discord_id: userId, balance: 0 }]);

            if (insertError) {
                console.error('Fehler beim Erstellen des Benutzers:', insertError);
                return interaction.reply({
                    content: 'Es gab einen Fehler bei der Registrierung.',
                    ephemeral: true,
                });
            }

            return interaction.reply({
                content: 'Du wurdest erfolgreich registriert!',
                ephemeral: true,
            });
        }
    },
};