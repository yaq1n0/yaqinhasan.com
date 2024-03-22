// script file for about.html specific functionality

// set carousel settings on load
window.addEventListener("load", () => {
  carouselCycle("about", getPageCurrent("about"));
});
window.addEventListener("load", () => {
  subCarouselCycle("year3");
});
