// Supabase Configuration & Client
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

// LocalStorage Helper - Ensuring no legacy dummy data persists
const LocalDB = {
    get(key) {
        try {
            const raw = localStorage.getItem('sb_local_' + key);
            if (!raw) return [];
            const data = JSON.parse(raw);
            // Filter out any legacy hardcoded dummy IDs to ensure complete cleanliness
            if (Array.isArray(data)) {
                return data.filter(item => item.id !== '1' && item.id !== '2' && item.id !== '3' && item.id !== '4' && item.id !== '5' && item.id !== '6');
            }
            return [];
        } catch(e) { return []; }
    },
    save(key, data) {
        localStorage.setItem('sb_local_' + key, JSON.stringify(data));
    }
};

// Force clear legacy localStorage cache on load if migration needed
if (!localStorage.getItem('sb_v5_cleaned')) {
    localStorage.removeItem('sb_local_materials');
    localStorage.removeItem('sb_local_announcements');
    localStorage.removeItem('sb_local_tests');
    localStorage.setItem('sb_v5_cleaned', 'true');
}
