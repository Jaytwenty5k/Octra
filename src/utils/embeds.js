const { EmbedBuilder } = require('discord.js');

function createEmbed(title, description, color = '#00FF00') {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);
}

module.exports = { createEmbed };