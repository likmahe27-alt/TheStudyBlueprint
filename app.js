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

// LocalStorage Helper (Restored for local uploads to work, but dummy-proofed)
const LocalDB = {
    get(key) {
        try {
            const raw = localStorage.getItem('sb_local_' + key);
            if (!raw) return [];
            const data = JSON.parse(raw);
            if (Array.isArray(data)) {
                // Permanently filter out the specific hardcoded IDs of the old dummy data
                return data.filter(item => item && !['1', '2', '3', '4'].includes(String(item.id)));
            }
            return [];
        } catch(e) { return []; }
    },
    save(key, data) {
        localStorage.setItem('sb_local_' + key, JSON.stringify(data));
    }
};

// Perform a deep clean of local storage on script load
if (!localStorage.getItem('sb_v11_cleaned')) {
    ['materials', 'announcements', 'tests'].forEach(key => {
        let items = LocalDB.get(key); // This auto-filters the dummy IDs
        LocalDB.save(key, items);     // Save the clean array back
    });
    localStorage.setItem('sb_v11_cleaned', 'true');
}
