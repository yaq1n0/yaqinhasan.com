// script file for technical.html specific functionality

// set carousel settings on load
window.addEventListener('load', ( () => {carouselCycle("technical", getPageCurrent("technical"));}));

// Initialize technical page carousel
document.addEventListener('DOMContentLoaded', () => {
    CarouselManager.initializePage('technical', '0'); // Default to first section
});
