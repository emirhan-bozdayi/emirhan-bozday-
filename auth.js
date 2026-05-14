// Supabase istemcisini başlatma
const supabaseUrl = 'https://kwmepcfeufinfxblxemo.supabase.co';
const supabaseKey = 'SANA_VERILEN_API_KEY'; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- KAYIT OL FONKSİYONU ---
async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) console.error("Kayıt hatası:", error.message);
    else alert("Kayıt başarılı! E-postanızı kontrol edin.");
}

// --- GİRİŞ YAP FONKSİYONU ---
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) console.error("Giriş hatası:", error.message);
    else {
        console.log("Giriş başarılı:", data.user);
        // Kullanıcıyı içeri al
    }
}
