
/* main JavaScript file, loaded in all html files */


function handlePortrait() {
    /* 
    function to handle objects that only render on 
    landscape (wide screen) or portrait (narrow screen) 
    */
    let landscape_elements = document.getElementsByClassName('show-landscape-only');
    let portrait_elements = document.getElementsByClassName('show-portrait-only');
    let w = window.outerWidth;
    let width_threshold = 600; /* above threshold = landscape, below threshold = portrait */

    if (w >= width_threshold) {
        /* landscape mode */
        
        /* hide dropdown menu if it's down */
        if (nav_dropped == true) hideNavDropdown();

        /* show landscape items and hide portrait items */
        for (let i=0; i<landscape_elements.length; i++) landscape_elements[i].style.display = 'flex';
        for (let i=0; i<portrait_elements.length; i++) portrait_elements[i].style.display = 'none';
    } else {
        /* portrait mode*/
        /* show portrait items and hide landscape items */
        for (let i=0; i<landscape_elements.length; i++) landscape_elements[i].style.display = 'none';
        for (let i=0; i<portrait_elements.length; i++) portrait_elements[i].style.display = 'flex';
    }
}


/* code for the dropdown menu that's available in portrait mode */
var dropdown_elements = document.getElementsByClassName('nav-dropdown-item');
var left_containers = document.getElementsByClassName('left-container');
var nav_dropped = false; 

function toggleNavDropdown() {
    if (nav_dropped == false) {
        showNavDropdown();
    } else {
        hideNavDropdown();
    }
}

function showNavDropdown(){
    for (let i=0; i<dropdown_elements.length; i++) {
        dropdown_elements[i].style.display = 'block';
    }

    for (let i=0; i<left_containers.length; i++) {
        left_containers[i].style.flexDirection = 'column';
    }
    nav_dropped = true;
} 

function hideNavDropdown(){
    for (let i=0; i<dropdown_elements.length; i++) {
        dropdown_elements[i].style.display = 'none';
    }

    for (let i=0; i<left_containers.length; i++) {
        left_containers[i].style.flexDirection = 'row';
    }
    nav_dropped = false;
}

/* handle portrait mode on load */
window.onload = handlePortrait();
