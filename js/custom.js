(function($) { "use strict"; 
	// Nav Menu Hover Script
	$('ul.nav li.dropdown').on('hover', function() {
	  $(this).find('.dropdown-menu').stop(true, true).fadeIn(500);
	}, function() {
	  $(this).find('.dropdown-menu').stop(true, true).fadeOut(500);
	});


	// hamburger menu icons
	$('.navbar-toggler').on('click', function(){
	   $(this).toggleClass('active');
	});
})(jQuery);


//Index
      // Typing effect script
      document.addEventListener('DOMContentLoaded', function() {
        const changingTextElement = document.getElementById('changing-text');
        const textOptions = [
          "Photographer", 
          "Videographer", 
          "Editor", 
          "Graphic Designer", 
          "Coding Enthusiast",
          "Jesus Son"
        ];
        
        let currentIndex = 0;
        let isDeleting = false;
        let charIndex = 0;
        let typingSpeed = 100; // Milliseconds per character
        let deletingSpeed = 100; // Faster deleting
        let pauseEnd = 2000; // Pause at end of word
        let pauseStart = 1000; // Pause before typing new word
        
        function typeText() {
          const currentText = textOptions[currentIndex];
          
          if (isDeleting) {
            // Deleting text
            changingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            // When deletion is complete
            if (charIndex <= 0) {
              isDeleting = false;
              currentIndex = (currentIndex + 1) % textOptions.length;
              // Pause before typing next word
              setTimeout(typeText, pauseStart);
              return;
            }
            
            setTimeout(typeText, deletingSpeed);
          } else {
            // Typing text
            changingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            // When typing is complete
            if (charIndex >= currentText.length) {
              isDeleting = true;
              // Pause at end of word
              setTimeout(typeText, pauseEnd);
              return;
            }
            
            setTimeout(typeText, typingSpeed);
          }
        }
        
        // Start typing
        setTimeout(typeText, pauseStart);
      });

      // Smooth infinite slider
      document.addEventListener('DOMContentLoaded', function() {
        const slider = document.getElementById('logo-slider');
        const subtitleElement = document.getElementById('service-subtitle');
        const slides = document.querySelectorAll('.slide');
        const dividers = document.querySelectorAll('.category-divider');
        
        // Buat map kategori
        let categories = [];
        let categoryMap = {};
        
        // Buat array kategori unik dan map divider
        slides.forEach(slide => {
          const category = slide.getAttribute('data-category');
          if (!categoryMap[category]) {
            categoryMap[category] = true;
            categories.push(category);
          }
        });
        
        // Set initial subtitle
        let currentCategory = categories[0];
        subtitleElement.textContent = currentCategory;
        
        // Clone slides dan dividers untuk membuat set duplikat
        // ini penting untuk efek infinite scroll yang mulus
        const allItems = [...slides, ...dividers];
        
        // Clone seluruh set slide dan divider
        allItems.forEach(item => {
          const clone = item.cloneNode(true);
          slider.appendChild(clone);
        });
        
        // Set kategori berikutnya untuk semua divider
        document.querySelectorAll('.category-divider').forEach((divider, index) => {
          const categoryIndex = index % categories.length;
          const nextCategoryIndex = (categoryIndex + 1) % categories.length;
          const nextCategory = categories[nextCategoryIndex];
          divider.setAttribute('data-next-category', nextCategory);
        });
        
        // Tentukan total lebar slider
        let sliderWidth = 0;
        allItems.forEach(item => {
          sliderWidth += item.offsetWidth;
        });
        
        // Mulai animasi dengan JavaScript (lebih mulus daripada CSS animation)
        let position = 0;
        let speed = 1.5; // pixel per frame
        
        function animateSlider() {
          position -= speed;
          
          // Ketika mencapai setengah lebar (satu set item), reset ke awal
          // untuk menciptakan ilusi infinite scrolling tanpa jeda
          if (Math.abs(position) >= sliderWidth) {
            position = 0;
          }
          
          slider.style.transform = `translateX(${position}px)`;
          
          // Deteksi kategori untuk subtitle
          updateCategory();
          
          requestAnimationFrame(animateSlider);
        }
        
        // Fungsi untuk memperbarui subtitel kategori
        function updateCategory() {
          const containerWidth = document.querySelector('.slider-container').offsetWidth;
          const containerCenter = containerWidth / 2;
          const sliderRect = slider.getBoundingClientRect();
          
          // Ambil semua divider
          const allDividers = document.querySelectorAll('.category-divider');
          
          // Cek setiap divider yang melewati tengah viewport
          allDividers.forEach(divider => {
            const dividerRect = divider.getBoundingClientRect();
            // Posisi relatif terhadap container
            const relativePos = dividerRect.left - sliderRect.left;
            const absolutePos = relativePos - Math.abs(position);
            
            // Container center area (lebar 50px)
            const centerMin = containerCenter - 2;
            const centerMax = containerCenter + 2;
            
            // Jika divider melewati tengah
            if (absolutePos >= centerMin && absolutePos <= centerMax) {
              const nextCategory = divider.getAttribute('data-next-category');
              if (nextCategory && nextCategory !== currentCategory) {
                // Update subtitle
                subtitleElement.style.opacity = 0;
                
                setTimeout(() => {
                  currentCategory = nextCategory;
                  subtitleElement.textContent = nextCategory;
                  subtitleElement.style.opacity = 1;
                }, 50);
              }
            }
          });
        }
        
        // Mulai animasi
        requestAnimationFrame(animateSlider);
        
        // Pause animation on hover
        slider.addEventListener('mouseenter', function() {
          speed = 0.3; // Pause
        });
        
        slider.addEventListener('mouseleave', function() {
          speed = 1.5; // Resume
        });
      });


  
//About Me
// Script untuk animasi teks terketik acak dan progress bar saat scroll
  document.addEventListener('DOMContentLoaded', function() {
    // Target elemen teks di col-md-4
    const textElements = document.querySelectorAll('.col-md-4 p.text-justify');
    // Target elemen progress bar
    const progressBars = document.querySelectorAll('.p-bar');

    // Set progress bar ke 0% di awal
    progressBars.forEach(bar => {
      // Simpan width target
      const targetWidth = bar.style.width;
      bar.setAttribute('data-target-width', targetWidth);
      // Set width awal ke 0
      bar.style.width = '0%';
    });

    // Simpan dimensi dan styling asli text element
    textElements.forEach(el => {
      // Simpan teks asli
      const originalText = el.textContent;
      el.setAttribute('data-original-text', originalText);
      
      // Simpan properti styling yang penting
      const styles = window.getComputedStyle(el);
      el.setAttribute('data-width', styles.width);
      el.setAttribute('data-height', styles.height);
      
      // Buat placeholder dengan karakter non-breaking space untuk mempertahankan ukuran
      // dan buat wadah span untuk karakter acak
      el.innerHTML = '';
      
      // Buat span untuk menampung teks scramble
      const scrambleSpan = document.createElement('span');
      scrambleSpan.classList.add('scramble-text');
      
      // Masukkan karakter awal
      for (let i = 0; i < originalText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = originalText[i];
        charSpan.style.visibility = 'hidden'; // Sembunyikan dahulu
        scrambleSpan.appendChild(charSpan);
      }
      
      el.appendChild(scrambleSpan);
    });

    // Fungsi untuk mengacak teks secara bertahap menuju teks asli
    function scrambleText(element, step, maxSteps) {
      if (step > maxSteps) return;
      
      const originalText = element.getAttribute('data-original-text');
      const originalChars = originalText.split('');
      const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|;:,.<>?/'.split('');
      
      // Ambil semua span karakter
      const charSpans = element.querySelectorAll('.scramble-text > span');
      
      // Pada step pertama, tampilkan semua span
      if (step === 0) {
        charSpans.forEach(span => {
          span.style.visibility = 'visible';
        });
      }
      
      // Persentase karakter yang sudah benar
      const completePercent = step / maxSteps;
      const charsToComplete = Math.floor(originalChars.length * completePercent);
      
      // Untuk setiap karakter
      for (let i = 0; i < charSpans.length; i++) {
        // Jika karakter ini sudah benar (dalam batas charsToComplete), pertahankan
        if (i < charsToComplete) {
          charSpans[i].textContent = originalChars[i];
        } 
        // Jika tidak, acak lagi - tapi pertahankan spasi
        else {
          // Peluang untuk menjadi karakter asli meningkat sesuai progress
          if (originalChars[i] === ' ') {
            charSpans[i].textContent = ' '; // Pertahankan spasi
            charSpans[i].innerHTML = '&nbsp;'; // Non-breaking space
          } else if (Math.random() < completePercent) {
            charSpans[i].textContent = originalChars[i];
          } else {
            charSpans[i].textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
          }
        }
      }
      
      // Panggil kembali fungsi dengan step berikutnya
      setTimeout(() => {
        scrambleText(element, step + 1, maxSteps);
      }, 50); // Jeda antara tiap step
    }

// Fungsi untuk animasi progress bar yang tidak mempengaruhi teks
function animateProgressBar(progressBar, targetWidth, duration) {
  // Simpan HTML asli dari progress bar
  const originalContent = progressBar.innerHTML;
  
  // Konversi target width dari string ke angka
  const targetValue = parseFloat(targetWidth);
  const startTime = performance.now();
  
  function updateWidth(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Nilai antara 0-1
    
    // Perbarui width saja
    progressBar.style.width = (progress * targetValue) + '%';
    
    // Pastikan konten tetap sama
    if (progressBar.innerHTML !== originalContent) {
      progressBar.innerHTML = originalContent;
    }
    
    // Jika animasi belum selesai, lanjutkan
    if (progress < 1) {
      requestAnimationFrame(updateWidth);
    }
  }
  
  requestAnimationFrame(updateWidth);
}

    // Menggunakan Intersection Observer untuk mendeteksi elemen masuk viewport
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Jika elemen adalah teks paragraf
          if (entry.target.classList.contains('text-justify')) {
            scrambleText(entry.target, 0, 20); // 20 steps untuk menyelesaikan animasi
            observer.unobserve(entry.target); // Hentikan observasi setelah animasi dimulai
          }
          
          // Jika elemen adalah progress bar
          if (entry.target.classList.contains('p-bar')) {
            const targetWidth = entry.target.getAttribute('data-target-width');
            animateProgressBar(entry.target, targetWidth, 2500); // Durasi 2.5 detik
            observer.unobserve(entry.target); // Hentikan observasi setelah animasi dimulai
          }
        }
      });
    }, {
      threshold: 0.1 // Trigger saat 10% elemen terlihat
    });

    // Observasi semua elemen teks dan progress bar
    textElements.forEach(el => {
      observer.observe(el);
    });
    
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  });