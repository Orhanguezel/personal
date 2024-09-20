document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerMenu.addEventListener('click', function () {
        // Menüdeki 'show' sınıfı açıp kapatıyoruz
        navMenu.classList.toggle('show');
        
        // Hamburger menüsünü X şekline dönüştürmek için 'open' sınıfını ekliyoruz
        hamburgerMenu.classList.toggle('open');
    });
});


// Ortadaki resme tıklayınca animasyonu tetikleyin
document.querySelector('.logo-about-me img').addEventListener('click', function() {
    document.querySelector('.logo-sport').classList.add('move-to-position');
    document.querySelector('.logo-education').classList.add('move-to-position');
    document.querySelector('.logo-sosial').classList.add('move-to-position');
    document.querySelector('.logo-projects').classList.add('move-to-position');
  });
  