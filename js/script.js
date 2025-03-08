// URL API Apps Script - Ganti dengan URL deployment Anda
const API_URL = 'https://script.google.com/macros/s/AKfycby8kD8MhPosWxKHSbxnybT1N1C61wraiLcDVyGSM_q3-EjRTK8g63FGiqtM1wRsqKQsdw/exec?api=true';

// Fungsi untuk mengambil data dari API
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Fungsi untuk mengatur konten halaman berdasarkan data
async function updatePageContent() {
  const data = await fetchData();
  if (!data) return;

  // Contoh: Update elemen HTML berdasarkan data
  // Misal, update judul website
  const settings = data.Settings || [];
  const siteName = settings.find(s => s.key === 'siteName')?.value || 'Portfolio';
  document.title = siteName;
  
  const siteNameElements = document.querySelectorAll('.navbar-brand, #footer-siteName');
  siteNameElements.forEach(el => {
    if (el) el.textContent = siteName;
  });

  // Update konten lain berdasarkan halaman
  const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  
  // Contoh untuk halaman home/index
  if (pageName === 'index' || pageName === '') {
    // Update hero section
    const profile = data.Profile && data.Profile.length > 0 ? data.Profile[0] : {};
    const heroName = document.getElementById('hero-name');
    if (heroName) {
      heroName.textContent = `Hi. Hello.. I Am ${profile.name || 'Photographer'}...!`;
    }
    
    // Tampilkan portfolio items
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer && data.Portfolio) {
      const activeItems = data.Portfolio.filter(item => item.active !== false);
      
      // Clear existing content
      portfolioContainer.innerHTML = '';
      
      // Add portfolio items
      activeItems.forEach(item => {
        // Create portfolio item HTML
        // ...
      });
      
      // Initialize MixItUp if available
      if (window.mixitup) {
        mixitup(portfolioContainer);
      }
    }
  }
  
  // Tambahkan kode untuk halaman lain (about, portfolio, dll.)
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', updatePageContent);