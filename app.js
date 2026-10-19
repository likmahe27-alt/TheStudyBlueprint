// Supabase Configuration & Client
// Replace these with your actual Supabase URL and Anon Key when deploying to production
const DEFAULT_SUPABASE_URL = 'YOUR_SUPABASE_URL';
const DEFAULT_SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

function getSupabaseClient() {
    const url = localStorage.getItem('sb_url') || DEFAULT_SUPABASE_URL;
    const key = localStorage.getItem('sb_key') || DEFAULT_SUPABASE_KEY;
    if (url === 'YOUR_SUPABASE_URL' || !window.supabase) {
        return null;
    }
    return window.supabase.createClient(url, key);
}

// LocalStorage Fallback Storage Helpers
const LocalDB = {
    get(key) {
        try {
            return JSON.parse(localStorage.getItem('sb_local_' + key)) || [];
        } catch(e) { return []; }
    },
    save(key, data) {
        localStorage.setItem('sb_local_' + key, JSON.stringify(data));
    }
};
