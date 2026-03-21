const supabaseUrl = 'https://yillyhywlhmgtqqbinvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpbGx5aHl3bGhtZ3RxcWJpbnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTc0NzgsImV4cCI6MjA4OTU5MzQ3OH0.qZ_47HRMiECxB3GuLATizIrx_GpZhKneKg7ieV8-Jk0';
let supabaseClient;

// Session Persistence Toggle: 'ON' = Stay logged in even after browser close, 'OFF' = Sign out on browser close
const PERSIST_SESSION = 'ON'; 

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const authError = document.getElementById('auth-error');
    const logoutBtn = document.getElementById('logout-btn');

    const newsForm = document.getElementById('news-form');
    const newsListContainer = document.getElementById('news-list-container');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const dateInput = document.getElementById('news-date');
    const importanceInput = document.getElementById('news-importance');

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    // Initialize Supabase Client securely
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: true,
                storage: PERSIST_SESSION === 'ON' ? window.localStorage : window.sessionStorage
            }
        });
    } else {
        console.error("Supabase CDN not loaded.");
        return;
    }

    // Check session on load
    checkSession();

    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            showDashboard();
        } else if (event === 'SIGNED_OUT') {
            showLogin();
        }
    });

    async function checkSession() {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            showDashboard();
        } else {
            showLogin();
        }
    }

    function showDashboard() {
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        loadNews();
    }

    function showLogin() {
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        loginForm.reset();
        authError.style.display = 'none';
    }

    // Auth flows
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        console.log("Login data:", data)
        console.error("Login error:", error)
        
        if (error) {
            authError.style.display = 'block';
            authError.textContent = error.message;
        } else {
            authError.style.display = 'none';
            showDashboard();
        }
    });

    logoutBtn.addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
    });

    // Load News
    async function loadNews() {
        const { data, error } = await supabaseClient.from('news').select('*').order('date', { ascending: false });

        if (error) {
            console.error('Error fetching news:', error);
            return;
        }

        newsListContainer.innerHTML = '';
        if (data.length === 0) {
            newsListContainer.innerHTML = '<p class="muted-text">Noch keine Neuigkeiten vorhanden.</p>';
            return;
        }

        data.forEach(item => {
            const dateObj = new Date(item.date);
            const dateStr = dateObj.toLocaleDateString('de-DE');

            const div = document.createElement('div');
            div.className = 'news-item';
            
            const badge = item.importance === 'high' ? '<span style="background:var(--primary);color:#fff;padding:2px 8px;border-radius:12px;font-size:0.75rem;margin-left:8px;vertical-align:middle;">Wichtig</span>' : '';
            
            div.innerHTML = `
                <div class="news-item-content">
                    <span class="news-item-date">${dateStr}${badge}</span>
                    <h4>${escapeHtml(item.title)}</h4>
                    <p>${escapeHtml(item.textfeed)}</p>
                </div>
                <div class="news-actions">
                    <button class="btn btn-secondary btn-small edit-btn" data-id="${item.id}">Bearbeiten</button>
                    <button class="btn btn-secondary btn-small delete-btn" data-id="${item.id}" style="color: #ef4444; border-color: #ef4444;">Löschen</button>
                </div>
            `;
            newsListContainer.appendChild(div);
        });

        // Attach event listeners for edit and delete
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const item = data.find(n => n.id === id);
                if (item) populateEditForm(item);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (confirm('Möchten Sie diese Nachricht wirklich löschen?')) {
                    const id = e.target.getAttribute('data-id');
                    await deleteNews(id);
                }
            });
        });
    }

    // Submit News
    newsForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('news-id').value;
        const title = document.getElementById('news-title').value;
        const textfeed = document.getElementById('news-text').value;
        const dateStr = document.getElementById('news-date').value;
        const importance = importanceInput.value;

        // Convert local date to ISO timestamp
        const dateObj = new Date(dateStr);
        const date = dateObj.toISOString();

        if (id) {
            // Update
            const { error } = await supabaseClient.from('news').update({ title, textfeed, date, importance }).eq('id', id);
            if (error) alert('Fehler beim Aktualisieren: ' + error.message);
        } else {
            // Insert
            const { error } = await supabaseClient.from('news').insert({ title, textfeed, date, importance });
            if (error) alert('Fehler beim Speichern: ' + error.message);
        }

        resetForm();
        loadNews();
    });

    async function deleteNews(id) {
        const { error } = await supabaseClient.from('news').delete().eq('id', id);
        if (error) alert('Fehler beim Löschen: ' + error.message);
        loadNews();
    }

    function populateEditForm(item) {
        document.getElementById('news-id').value = item.id;
        document.getElementById('news-title').value = item.title;
        document.getElementById('news-text').value = item.textfeed;
        document.getElementById('news-date').value = item.date.split('T')[0];
        importanceInput.value = item.importance || 'normal';

        formTitle.textContent = 'Nachricht bearbeiten';
        submitBtn.textContent = 'Aktualisieren';
        cancelEditBtn.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetForm() {
        newsForm.reset();
        document.getElementById('news-id').value = '';
        dateInput.value = today;
        importanceInput.value = 'normal';
        formTitle.textContent = 'Neue Nachricht erstellen';
        submitBtn.textContent = 'Speichern';
        cancelEditBtn.classList.add('hidden');
    }

    cancelEditBtn.addEventListener('click', resetForm);

    function escapeHtml(unsafe) {
        return (unsafe || "").toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
