#!/bin/bash

# Projektname
PROJECT_NAME="Octra"

# Basisverzeichnis erstellen



# Erstelle die Hauptverzeichnisse
mkdir bot website database scripts

# Verzeichnisstruktur für den Bot
mkdir -p bot/{commands,events,utils}

# Verzeichnisstruktur für die Website
mkdir -p website/{src,public,styles}

# Verzeichnisstruktur für die Datenbank
mkdir -p database/{migrations,models}

# Skripte für die Datenbank und Hilfsfunktionen
touch database/db.js
touch scripts/deploy.sh

# Basisdateien erstellen

# index.js für den Bot
cat <<EOL > bot/index.js
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.login('YOUR_BOT_TOKEN');
EOL

# Einfacher HTML Grundgerüst für die Website
cat <<EOL > website/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Octra Bot</title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <div id="root"></div>
    <script src="src/index.js"></script>
</body>
</html>
EOL

# Einfache React-Datei für die Website
cat <<EOL > website/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return <h1>Welcome to Octra Bot!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
EOL

# Basis CSS für die Website
cat <<EOL > website/styles/style.css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    text-align: center;
}
EOL

# Einfache Datenbank-Migrationsdatei (z.B. für User-Tabelle)
cat <<EOL > database/migrations/001_create_users_table.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    discord_id BIGINT NOT NULL UNIQUE
);
EOL

# Grundlegendes Model für die Datenbank
cat <<EOL > database/models/user.js
const { Client } = require('pg');

const client = new Client({
    user: 'your_username',
    host: 'localhost',
    database: 'octra_db',
    password: 'your_password',
    port: 5432,
});

client.connect();

module.exports = client;
EOL

# Einfache Deploy-Skript für das Projekt
cat <<EOL > scripts/deploy.sh
#!/bin/bash
echo "Deploying project..."
# Hier können später spezifische Deploy-Schritte hinzugefügt werden
EOL

# Installiere die notwendigen npm-Pakete
npm init -y
npm install discord.js express react react-dom pg

# Hinweis für das Projekt
echo "Projektstruktur für $PROJECT_NAME wurde erfolgreich erstellt!"
echo "Vergiss nicht, deine .env-Datei zu erstellen und deine Bot-Token und Datenbankdetails hinzuzufügen."