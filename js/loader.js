const body = document.querySelector("body"),
    loader = document.querySelector(".progress-wrap");


if (!localStorage.getItem('hasLoaded')) {
    // Loader'ı göster
    function fadeOutEffect() {
        const fadeEffect = setInterval(function() {
            if (!loader.style.opacity) {
                loader.style.opacity = 1;
            }
            if (loader.style.opacity > 0) {
                loader.style.opacity -= 0.1;
            } else {
                body.classList.remove('stop-scroll');
                loader.classList.add('remove');
                clearInterval(fadeEffect);
            }
        }, 100);
    }

    window.addEventListener("load", function() {
        setTimeout(fadeOutEffect, 2000); 
    });


    localStorage.setItem('hasLoaded', true);
} else {

    loader.style.display = "none";
}

