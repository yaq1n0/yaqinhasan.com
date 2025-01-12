// script file for about.html specific functionality

// set carousel settings on load
window.addEventListener("load", () => {
  carouselCycle("about", getPageCurrent("about"));
});
window.addEventListener("load", () => {
  subCarouselCycle("year3");
});

// Initialize about page carousel
document.addEventListener('DOMContentLoaded', () => {
    CarouselManager.initializePage('about', '0'); // Default to skills summary (id="0")
});
