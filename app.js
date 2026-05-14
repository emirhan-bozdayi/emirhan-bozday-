/**
 * Bozdayı Bilişim - Ana Fonksiyon Dosyası
 */

// Supabase Yapılandırması
const supabaseUrl = 'https://kwmepcfeufinfxblxemo.supabase.co';
const supabaseKey = 'SENIN_SUPABASE_ANON_KEY_BURAYA'; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Sayfa yüklendiğinde oturumu kontrol et ve verileri çek
window.onload = () => {
    checkUserStatus();
    loadAllPosts();
};

/** Oturum Durumu Kontrolü */
async function checkUserStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    const loginBtn = document.getElementById('authLinks');
    const formSection = document.getElementById('postSection');

    if (user) {
        loginBtn.innerHTML = `<span>${user.email}</span> <button onclick="logout()">Çıkış</button>`;
        formSection.classList.remove('hidden'); // Giriş yapan formu görür
    }
}

/** Yeni Gönderi Oluşturma (Forum veya Destek) */
async function createPost() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Lütfen önce giriş yapın!");

    const postData = {
        user_id: user.id,
        user_email: user.email,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        type: document.getElementById('type').value, // 'forum' veya 'support'
    };

    const { error } = await supabase.from('posts').insert([postData]);

    if (error) alert("Hata: " + error.message);
    else {
        alert("Başarıyla gönderildi!");
        location.reload();
    }
}

/** Verileri Listeleme */
async function loadAllPosts() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (data) {
        const listContainer = document.getElementById('postList');
        listContainer.innerHTML = posts.map(p => `
            <div class="card">
                <small style="color: ${p.type === 'support' ? 'red' : 'blue'}">#${p.type.toUpperCase()}</small>
                <h4>${p.title}</h4>
                <p>${p.content}</p>
                <hr>
                <small>Gönderen: ${p.user_email}</small>
            </div>
        `).join('');
    }
}

async function logout() { await supabase.auth.signOut(); location.reload(); }
