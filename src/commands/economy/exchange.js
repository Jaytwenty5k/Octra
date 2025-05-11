const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exchange')
        .setDescription('Wechselt Währungen um.')
        .addStringOption(option => 
            option.setName('von')
                .setDescription('Die Ausgangswährung.')
                .setRequired(true)
                .addChoices(
                    { name: 'Coins', value: 'coins' },
                    { name: 'Gold', value: 'gold' },
                    { name: 'Money', value: 'money' }
                ))
        .addStringOption(option => 
            option.setName('nach')
                .setDescription('Die Zielwährung.')
                .setRequired(true)
                .addChoices(
                    { name: 'Coins', value: 'coins' },
                    { name: 'Gold', value: 'gold' },
                    { name: 'Money', value: 'money' }
                ))
        .addIntegerOption(option => 
            option.setName('betrag')
                .setDescription('Der Betrag, der gewechselt werden soll.')
                .setRequired(true)),
    async execute(interaction) {
        const from = interaction.options.getString('von');
        const to = interaction.options.getString('nach');
        const amount = interaction.options.getInteger('betrag');

        if (from === to) {
            return interaction.reply({ 
                embeds: [createEmbed('Fehler', 'Die Ausgangs- und Zielwährung müssen unterschiedlich sein.', '#FF0000')], 
                ephemeral: true 
            });
        }

        // Beispielhafte Wechselkurse (später dynamisch aus der DB)
        const rates = {
            coins_to_gold: 0.01,
            gold_to_coins: 100,
            money_to_gold: 0.02,
            gold_to_money: 50,
        };

        const rateKey = `${from}_to_${to}`;
        const rate = rates[rateKey];

        if (!rate) {
            return interaction.reply({ 
                embeds: [createEmbed('Fehler', 'Wechselkurs nicht verfügbar.', '#FF0000')], 
                ephemeral: true 
            });
        }

        const converted = amount * rate;
        const embed = createEmbed(
            'Währungsumtausch',
            `${amount} ${from} wurden zu ${converted} ${to} umgewandelt.`
        );
        await interaction.reply({ embeds: [embed] });
    },
};