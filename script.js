document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.slider-wrapper', {
        effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 2,
      coverflowEffect: {
        rotate: 15,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,

      breakpoints: {
        0: {
            slidesPerView: 1,
        },
        800: {
            slidesPerView: .67,
        },
        1200: {
          slidesPerView: 3,
        }
    },
      });
});