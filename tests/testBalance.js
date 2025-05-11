// src/testBalance.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pdokwlvqrsffgcadioxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkb2t3bHZxcnNmZmdjYWRpb3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MjQ2MTksImV4cCI6MjA2MjQwMDYxOX0.uWIl2xd5OyU4r5qYMC77h6_O-nivDyPYBbjOXQyWGMM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBalance() {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('balance')
            .limit(1);

        if (error) {
            console.error('Fehler beim Abrufen des Guthabens:', error);
        } else {
            console.log('Erfolgreiche Abfrage:', data);
        }
    } catch (err) {
        console.error('Unerwarteter Fehler:', err);
    }
}

testBalance();