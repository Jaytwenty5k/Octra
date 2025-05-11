// src/supabaseClient.js
require('dotenv').config(); // Lädt die .env-Datei

const { createClient } = require('@supabase/supabase-js');

// Hole die Supabase-URL und den Anonymisierungsschlüssel aus den Umgebungsvariablen
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Erstelle den Supabase-Client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };