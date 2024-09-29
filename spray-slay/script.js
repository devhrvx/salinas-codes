var prodInfo = {
    name: 'Spray and Slay',
    description: 'Multi-benefit sunscreen spray',
    effects: 'Cooling, Whitening, Anti-aging, Anti-microbial,and UV Protection',
    activeIngredients: 'Retinol, Niacinamide, Menthol, Titanium dioxide, Zinc oxide, Glycolic acid, Vitamin C, Aloe Vera extract,and Triclosan',
    project: 'Physical science chemistry making a website for active ingredients powered product'
};

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const leftText = document.querySelector('.left');
    const rightText = document.querySelector('.right');
    
    if (scrollPosition > 6) {
        leftText.style.transform = 'translateX(0)'; 
        rightText.style.transform = 'translateX(0)';
        leftText.style.opacity = 1;
        rightText.style.opacity = 1;
    } else {
        leftText.style.transform = 'translateX(-100%)';
        rightText.style.transform = 'translateX(100%)';
        leftText.style.opacity = 0;
        rightText.style.opacity = 0;
    }
});


const swiper = new Swiper('.slider-wrapper', {
    // Optional parameters
    direction: 'horizontal',
    spaceBetween: 30,
    centeredSlides: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        620: {
            slidesPerView: 1
        },
        1024: {
            slidesPerView: 1
        }
    },

    on: {
        slideChange: function () {
          const wrapper = document.querySelector('.slider-wrapper');
          if (this.activeIndex === 0) {
            wrapper.style.backgroundColor = '#f6fc9f76'; // Background for Slide 1
          } else if (this.activeIndex === 1) {
            wrapper.style.backgroundColor = '#9ffcb376'; // Background for Slide 2
          } else if (this.activeIndex === 2) {
            wrapper.style.backgroundColor = '#99fdff76'; // Background for Slide 3
          }
        }
      }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
});
  