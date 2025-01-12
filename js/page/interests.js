// script file for interests.html specific functionality

// set carousel settings on load
window.addEventListener('load', ( () => {carouselCycle("interests", getPageCurrent("interests"));}));

// Initialize interests page carousel
document.addEventListener('DOMContentLoaded', () => {
    CarouselManager.initializePage('interests', '0'); // Default to first interest
});
