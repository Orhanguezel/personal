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
