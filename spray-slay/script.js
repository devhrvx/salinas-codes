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