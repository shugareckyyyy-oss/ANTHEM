<script>
  // ===== 1. Анимация fade-up (появление элементов при скролле) =====
  const items = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15 // Элемент появляется когда 15% его видно
  });

  items.forEach(item => observer.observe(item));

//burgerButton
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow =
      menu.classList.contains('active') ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', closeMenu)
  );

  function closeMenu() {
    burger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

/*==== SLIDER ====*/
document.querySelectorAll('.motivation-slider').forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    let current = 0;
    let startX = 0;
    let interval;

    function showSlide(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
    }

    function nextSlide() {
      showSlide(current + 1);
    }

    function prevSlide() {
      showSlide(current - 1);
    }

    // ===== AUTOPLAY =====
    function startAutoPlay() {
      interval = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
      clearInterval(interval);
    }

    startAutoPlay();

    // ===== SWIPE =====
    slider.addEventListener('touchstart', e => {
      stopAutoPlay();
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) nextSlide();
      if (diff < -50) prevSlide();

      startAutoPlay();
    });

    // ===== OPEN FULLSCREEN =====
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        openLightbox(slide.src);
      });
    });
  });

  // ===== LIGHTBOX =====
  document.addEventListener('DOMContentLoaded', () => {

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');

  document.querySelectorAll('.motivation-slider').forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    let current = 0;
    let startX = 0;
    let interval;

    if (!slides.length) return;

    function showSlide(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
    }

    function next() { showSlide(current + 1); }
    function prev() { showSlide(current - 1); }

    // autoplay
    function startAuto() {
      interval = setInterval(next, 3000);
    }

    function stopAuto() {
      clearInterval(interval);
    }

    startAuto();

    // swipe
    slider.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      stopAuto();
    });

    slider.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 50) next();
      if (diff < -50) prev();
      startAuto();
    });

    // fullscreen
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        lightboxImage.src = slide.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  });

  // close lightbox
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

});


// скрипт для картоек тренеров
const slider = document.querySelector('.coaches-slider');

window.addEventListener('orientationchange', () => {
  slider.scrollLeft = slider.scrollLeft;
});


//скрипт для кнопки подробнее в тренерах

document.addEventListener('pointerdown', () => {

  const modal = document.querySelector('.coach-modal');
  const list = modal.querySelector('.coach-modal__list');
  const tgBtn = modal.querySelector('.coach-modal__button');
  const overlay = modal.querySelector('.coach-modal__overlay2');
  const closeBtn = modal.querySelector('.coach-modal__close');

  document.addEventListener('click', e => {
    const btn = e.target.closest('.coaches-button');
    if (!btn) return;

    // очищаем список
    list.innerHTML = '';

    // создаём пункты
    const achievements = btn.dataset.achievements
      .split('|')
      .map(item => item.trim());

    achievements.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });

    // telegram
    tgBtn.href = btn.dataset.telegram;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

});
//прогрессбар
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + '%';
});
</script>