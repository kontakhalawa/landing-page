/* =====================================================
   KONFIGURASI — ubah di sini saja
===================================================== */
const CONFIG = {
  waNumber: '6281234567890', // ganti dengan nomor WA (format 62, tanpa + atau 0)
  defaultMessage: 'Halo, saya mau konsultasi gratis.',
};

/* =====================================================
   1. AUTO-GENERATE LINK WHATSAPP
   Semua elemen dengan [data-wa] otomatis jadi link WA
===================================================== */
document.querySelectorAll('[data-wa]').forEach((el) => {
  const message = el.getAttribute('data-wa') || CONFIG.defaultMessage;
  const url = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(message)}`;
  el.setAttribute('href', url);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

/* =====================================================
   2. NAVBAR SCROLL EFFECT
===================================================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* =====================================================
   3. FAQ ACCORDION
===================================================== */
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    // Tutup semua
    document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
    // Buka yang diklik
    if (!isOpen) item.classList.add('open');
  });
});

/* =====================================================
   4. ANIMASI REVEAL SAAT SCROLL
===================================================== */
const revealTargets = document.querySelectorAll(
  '.section-title, .section-sub, .benefit-card, .testi-card, .price-card, .problem-card, .stat, .solution-text, .hero-text'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));

/* =====================================================
   5. TAHUN OTOMATIS DI FOOTER
===================================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =====================================================
   6. TRACKING KLIK WHATSAPP (opsional)
   Ganti dengan GA4 / Meta Pixel jika sudah dipasang
===================================================== */
document.querySelectorAll('[data-wa]').forEach((el) => {
  el.addEventListener('click', () => {
    const label = el.textContent.trim().slice(0, 40);
    // Contoh GA4:
    // if (typeof gtag === 'function') gtag('event', 'wa_click', { label });
    // Contoh Meta Pixel:
    // if (typeof fbq === 'function') fbq('track', 'Contact');
    console.log('[WA Click]', label);
  });
});