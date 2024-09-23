document.addEventListener("DOMContentLoaded", function() {
    const aboutMeImage = document.querySelector('.about-mee img');
    
    if (aboutMeImage) {
        aboutMeImage.addEventListener('click', function() {
            document.querySelector('.sport').classList.add('move-to-position');
            document.querySelector('.education').classList.add('move-to-position');
            document.querySelector('.sosial').classList.add('move-to-position');
            document.querySelector('.experince').classList.add('move-to-position');
        });
    } else {
        console.error("'.about-mee img' öğesi bulunamadı!");
    }
});