
// script file for the functions related to portrait mode
// and the dropdown menu that comes with it

var navDropped = false;

// handle portrait, called on load and on resize
function handlePortrait() {
  // elements that only show in landscape
  let landscapeElements = document.getElementsByClassName("show-landscape-only");
  // elements that only show in portrait
  let portraitElements = document.getElementsByClassName("show-portrait-only");
  // get viewport width
  let w = window.outerWidth;
  // above threshold = landscape, below threshold = portrait
  let widthThreshold = 800;

  if (w >= widthThreshold) {
    // hide dropdown menu if it's down
    if (navDropped == true) hideNavDropdown();

    // show landscape items
    for (let elem of landscapeElements) elem.style.display = "flex";

    // hide portrait items
    for (let elem of portraitElements) elem.style.display = "none";
  } else {
    // hide landscape items
    for (let elem of landscapeElements) elem.style.display = "none";

    // show portrait items
    for (let elem of portraitElements) elem.style.display = "flex";
  }
}

// show the dropdown menu
function showNavDropdown() {
  let dropdownElements = document.getElementsByClassName('dropdown-item');
  let leftContainer = document.getElementById('left-container');
  let dropdownIcon = document.getElementById('dropdown-icon');

  // show all dropdown elements
  for (let elem of dropdownElements) {
    elem.style.display = 'flex';
  }

  leftContainer.style.flexDirection = 'column'; 
  dropdownIcon.style.transform = 'rotate(90deg)'; // rotate icon to dropped down
  navDropped = true;
}

// hide the dropdown menu
function hideNavDropdown() {
  let dropdownElements = document.getElementsByClassName('dropdown-item');
  let leftContainer = document.getElementById('left-container');
  let dropdownIcon = document.getElementById('dropdown-icon');

  // hide all dropdown elements
  for (let elem of dropdownElements) {
    elem.style.display = 'none';
  } 

  leftContainer.style.flexDirection = 'row';
  dropdownIcon.style.transform = 'none'; // revert icon to normal 
  navDropped = false;
}

// toggle the dropdown menu
function toggleNavDropdown() {
  if (navDropped) {
    hideNavDropdown();
  } else {
    showNavDropdown();
  }
}

// handle portrait mode on load and on resize
window.addEventListener("load", handlePortrait);
window.addEventListener("resize", handlePortrait);