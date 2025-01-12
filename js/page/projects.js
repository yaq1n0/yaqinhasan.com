// script file for projects.html specific functionality

// set carousel settings on load
window.addEventListener('load', ( () => {carouselCycle("projects", getPageCurrent("projects"));}));

// Initialize projects page carousel
document.addEventListener('DOMContentLoaded', () => {
    CarouselManager.initializePage('projects', '0'); // Default to first project
});
