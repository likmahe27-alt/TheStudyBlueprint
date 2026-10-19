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

// LocalStorage Helper (Strictly cloud-first, returns empty if nothing in Supabase/Local)
const LocalDB = {
    get(key) {
        try {
            const raw = localStorage.getItem('sb_local_' + key);
            if (!raw) return [];
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch(e) { return []; }
    },
    save(key, data) {
        localStorage.setItem('sb_local_' + key, JSON.stringify(data));
    }
};

// Clear any old legacy cache on startup
if (!localStorage.getItem('sb_v8_wiped')) {
    localStorage.removeItem('sb_local_materials');
    localStorage.removeItem('sb_local_announcements');
    localStorage.removeItem('sb_local_tests');
    localStorage.setItem('sb_v8_wiped', 'true');
}
