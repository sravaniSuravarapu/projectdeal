window.addEventListener("load", function() {
    const sliderContainer = document.querySelector(".slider-container");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    let currentPosition = 0;
    let slideWidth = 0;

    function setSlideWidth() {
        slideWidth = sliderContainer.offsetWidth;
    }

    prevButton.addEventListener("click", function(event) {
        event.preventDefault();
        currentPosition += slideWidth;
        if (currentPosition > 0) {
            currentPosition = -(slideWidth * (sliderContainer.children.length - 1));
        }
        sliderContainer.style.transform = `translateX(${currentPosition}px)`;
    });

    nextButton.addEventListener("click", function(event) {
        event.preventDefault();
        currentPosition -= slideWidth;
        if (currentPosition < -(slideWidth * (sliderContainer.children.length - 1))) {
            currentPosition = 0;
        }
        sliderContainer.style.transform = `translateX(${currentPosition}px)`;
    });

    // Call setSlideWidth initially and on window resize
    setSlideWidth();
    window.addEventListener("resize", setSlideWidth);
});
