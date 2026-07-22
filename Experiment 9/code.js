html<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storage Preferences Dashboard</title>
    <style>
        /* Base configuration variables mapped natively */
        :root {
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --text-color: #0f172a;
            --border-color: #cbd5e1;
        }

        /* Dark mode overrides applied seamlessly */
        [data-theme="dark"] {
            --bg-color: #0f172a;
            --card-bg: #1e293b;
            --text-color: #f8fafc;
            --border-color: #334155;
        }

        body { 
            background-color: var(--bg-color); 
            color: var(--text-color); 
            font-family: system-ui, sans-serif; 
            margin: 40px; 
            transition: background-color 0.3s, color 0.3s; 
        }

        .card { 
            max-width: 500px; 
            margin: 0 auto; 
            background: var(--card-bg); 
            padding: 25px; 
            border-radius: 8px; 
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
        }

        .setting-group { 
            margin-bottom: 20px; 
            padding-bottom: 15px; 
            border-bottom: 1px solid var(--border-color); 
        }

        label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px; }
        
        select, textarea { 
            width: 100%; 
            padding: 10px; 
            box-sizing: border-box; 
            background: var(--bg-color); 
            color: var(--text-color); 
            border: 1px solid var(--border-color); 
            border-radius: 6px; 
            font-size: 15px; 
        }

        textarea { height: 100px; resize: none; }
        
        .storage-indicator { 
            font-size: 12px; 
            color: #64748b; 
            margin-top: 5px; 
            font-style: italic; 
        }

        .btn-clear { 
            background: #ef4444; 
            color: white; 
            border: none; 
            padding: 8px 14px; 
            border-radius: 4px; 
            cursor: pointer; 
            font-weight: 500; 
        }
        .btn-clear:hover { background: #dc2626; }
    </style>
</head>
<body>

<div class="card">
    <h2>User Preference Control Center</h2>
    
    <!-- LocalStorage Target Structure -->
    <div class="setting-group">
        <label for="themeSelect">UI Theme Selection (Persistent)</label>
        <select id="themeSelect">
            <option value="light">☀️ Light Theme</option>
            <option value="dark">🌙 Dark Theme</option>
        </select>
        <div class="storage-indicator">Saved inside LocalStorage (Survives browser reboots).</div>
    </div>

    <!-- SessionStorage Target Structure -->
    <div class="setting-group">
        <label for="sessionNotes">Scratchpad Workspace Notes (Volatile)</label>
        <textarea id="sessionNotes" placeholder="Type temporary notes here..."></textarea>
        <div class="storage-indicator">Saved inside SessionStorage (Wiped instantly if tab closes).</div>
    </div>

    <button id="clearStorageBtn" class="btn-clear">Reset All Storage Data</button>
</div>

<script>
// ==========================================
// 1. DOM NODES SELECTORS
// ==========================================
const themeSelect = document.getElementById('themeSelect');
const sessionNotes = document.getElementById('sessionNotes');
const clearStorageBtn = document.getElementById('clearStorageBtn');

// ==========================================
// 2. WEB STORAGE UTILITY LAYER
// ==========================================

// Core Function: Loads configurations immediately on page initialization
const loadSavedPreferences = () => {
    // ---- A. LocalStorage Extraction ----
    const cachedTheme = localStorage.getItem('userAppTheme');
    if (cachedTheme) {
        themeSelect.value = cachedTheme;
        // Inject configuration data property explicitly into document tree
        document.documentElement.setAttribute('data-theme', cachedTheme);
    } else {
        // Fallback layout initialization defaults
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // ---- B. SessionStorage Extraction ----
    const cachedNotes = sessionStorage.getItem('activeSessionNotes');
    if (cachedNotes) {
        sessionNotes.value = cachedNotes;
    }
};

// ==========================================
// 3. MUTATION EVENT LISTENERS
// ==========================================

// Intercepts theme selector changes to commit updates to localStorage
themeSelect.addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    
    // UI Update Strategy
    document.documentElement.setAttribute('data-theme', selectedTheme);
    
    // Core Mutation: Write plain-text configuration strings to persistent cache
    localStorage.setItem('userAppTheme', selectedTheme);
});

// Intercepts typing inside text area to commit data updates to sessionStorage
sessionNotes.addEventListener('input', (event) => {
    const activeText = event.target.value;
    
    // Core Mutation: Write plain-text configuration strings to temporary memory
    sessionStorage.setItem('activeSessionNotes', activeText);
});

// Clears all storage keys and refreshes the application UI view
clearStorageBtn.addEventListener('click', () => {
    // Structural Storage Eviction
    localStorage.removeItem('userAppTheme');
    sessionStorage.removeItem('activeSessionNotes');

    // Alternatively, use global clearing with safety caution:
    // localStorage.clear(); sessionStorage.clear();

    // Reset UI component nodes state immediately
    themeSelect.value = 'light';
    sessionNotes.value = '';
    document.documentElement.setAttribute('data-theme', 'light');
});

// Run preferences loader function on compilation setup boot
loadSavedPreferences();
</script>

</body>
</html>
