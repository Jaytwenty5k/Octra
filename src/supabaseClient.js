// src/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

// Deine Supabase-URL und der API-Schlüssel aus der .env-Datei
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Überprüfe, ob die Umgebungsvariablen gesetzt sind
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase-URL oder -Schlüssel fehlen in der .env-Datei!');
}

// Erstelle den Supabase-Client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = { supabase };