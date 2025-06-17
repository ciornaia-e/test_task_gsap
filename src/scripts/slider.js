let swiperInstance = null;

function initSwiper() {
    if (!swiperInstance) {
        swiperInstance = new Swiper('.artists-swiper', {
            loop: true,
            effect: 'fade',
            fadeEffect: {
              crossFade: true,
            },
            speed: 800,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            on: {
              slideChangeTransitionStart() {
                const slides = document.querySelectorAll('.swiper-slide');
                slides.forEach(slide => {
                  slide.style.zIndex = '0';
                  slide.style.opacity = '0';
                });
                const activeSlide = document.querySelector('.swiper-slide-active');
                if (activeSlide) {
                  activeSlide.style.zIndex = '2';
                  activeSlide.style.opacity = '1';
                }
              }
            }
        });
    }
}

function destroySwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
}

function handleResize() {
    if (window.innerWidth <= 992) {
      initSwiper();
    } else {
      destroySwiper();
    }
}

window.addEventListener('DOMContentLoaded', handleResize);
window.addEventListener('resize', handleResize);