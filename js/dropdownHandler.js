
// script file for the functions related to the dropdown menu 
// in the navigation bar for portrait mode

var dropdown_elements = document.getElementsByClassName('dropdown-item');
var left_container = document.getElementById('left-container');
var dropdown_icon = document.getElementById('dropdown-icon');
var nav_dropped = false;


function showNavDropdown() {
  // show all dropdown elements
  for (let i = 0; i < dropdown_elements.length; i++) {
    dropdown_elements[i].style.display = 'flex';
  }

  left_container.style.flexDirection = 'column';
  // rotate icon to dropped down
  dropdown_icon.style.transform = 'rotate(30deg)';
  
  dropdown_icon.style.transform = 'rotate(60deg)';
  dropdown_icon.style.transform = 'rotate(90deg)';
  nav_dropped = true;
}


function hideNavDropdown() {
  // hide all dropdown elements
  for (let i = 0; i < dropdown_elements.length; i++) {
    dropdown_elements[i].style.display = 'none';
  } 

  left_container.style.flexDirection = 'row';
  // revert icon to normal 
  dropdown_icon.style.transform = 'none'; 
  nav_dropped = false;
}


function toggleNavDropdown() {
  if (nav_dropped) {
    hideNavDropdown();
  } else {
    showNavDropdown();
  }
}