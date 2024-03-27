
/* main JavaScript file for yaqinhasan.com */

/*==== "globals" ====*/
var overflowShown = false;

/*==== portrait mode related JavaScript ====*/
function handlePortrait() {
    // elements that only show in landscape
    let landscapeElements = document.getElementsByClassName("show-landscape-only");

    // elements that only show in portrait
    let portraitElements = document.getElementsByClassName("show-portrait-only");

    // nav divider item
    let navDivider = document.getElementById("nav-divider");

    // page shortcuts menus
    let pageShortcutsMenu = document.getElementById("page-shortcuts")

    // get viewport width
    let w = window.outerWidth;

    // above threshold = landscape, below threshold = portrait
    let widthThreshold = 900;
  
    if (w >= widthThreshold) {
      // show landscape items
      for (let elem of landscapeElements) elem.style.display = "flex";
  
      // hide portrait items
      for (let elem of portraitElements) elem.style.display = "none";

      // show page shortcuts by default
      if (pageShortcutsMenu != null) pageShortcutsMenu.open = true;
    } else {
      // hide landscape items
      for (let elem of landscapeElements) elem.style.display = "none";
  
      // show portrait items
      for (let elem of portraitElements) elem.style.display = "flex";

      // hide page shortcuts by default
      if (pageShortcutsMenu != null) pageShortcutsMenu.open = false;

      // hide nav overflow
      hideNavOverflow();
}
}



/*==== dropdown/overflow nav bar related JavaScript ====*/
// show nav bar overflow icons
function showNavOverflow() {
  let overflowItems = document.getElementsByClassName('overflow-item');
  let dropdownIcon = document.getElementById('dropdown-icon');

  // show all dropdown elements
  for (let elem of overflowItems) {
    elem.style.display = 'flex';
  }

  dropdownIcon.style.transform = 'rotate(90deg)'; // rotate icon to dropped down
  overflowShown = true;
}

// hide nav var overflow icons
function hideNavOverflow() {
  let overflowItems = document.getElementsByClassName('overflow-item');
  let dropdownIcon = document.getElementById('dropdown-icon');

  // hide all dropdown elements
  for (let elem of overflowItems) {
    elem.style.display = 'none';
  } 

  dropdownIcon.style.transform = 'none'; // revert icon to normal 
  overflowShown = false;
}

// toggle the dropdown menu
function handleNavOverflow() {
  if (overflowShown) {
    hideNavOverflow();
  }  else{
    showNavOverflow();
  }
}




/*==== developer mode related JavaScript ====*/
function handleDev() {
    let devMode = sessionStorage.getItem('devMode');    
    let toggle = document.getElementById('dev-toggle');
    let devItems = document.getElementsByClassName('show-dev-only');
    if (devMode == 'true') {
        for (item of devItems) {
            item.style.display = 'flex';
        }
        toggle.checked = true;
    } else if (devMode == 'false') {
        for (item of devItems) {
            item.style.display = 'none';
        }
        toggle.checked = false;
    } 
}

function toggleDev() {
    let toggle = document.getElementById('dev-toggle');

    if (toggle.checked == true) {
        sessionStorage.setItem('devMode', 'true');
    } else if (toggle.checked == false) {
        sessionStorage.setItem('devMode', 'false');
    }

    handleDev();
}




/*==== carousel related JavaScript ====*/
// set pageCurrent object
// this can be called from other pages to enable cross-page shortcuts
function setPageCurrent(pageName, current) {
    sessionStorage.setItem(`${pageName}Current`, current);
    // console.log("[carouselHandler.js]");
}

// get pageCurrent object
// not a strictly necessary function, but useful for encapsulation and logging
function getPageCurrent(pageName) {
    let current = sessionStorage.getItem(`${pageName}Current`);
    
    if (current == null) {
      setPageCurrent(pageName, "0");
      current = sessionStorage.getItem(`${pageName}Current`);
    }

    // console.log("[carouselHandler.js]");
    return current;
}


// go to specific carousel-item
function carouselCycle(pageName, id) {
  let items = document.getElementsByClassName('carousel-item');

  for (let item of items) {
    item.style.display = "none";
  }

  document.getElementById(id).style.display = "flex";

  sessionStorage.setItem(`${pageName}Current`, id); // set current item in sessionStorage
}


// go to the previous carousel-item, handle loopback
function carouselPrevious(pageName) {
  let current = sessionStorage.getItem(`${pageName}Current`);
  let items = document.getElementsByClassName('carousel-item');
  let last = items.length - 1; 

  if (current != null) {
    let previous = parseInt(current) - 1;
    if (previous < 0) previous = last;
    carouselCycle(pageName, previous);
  }
}


// go to the next carousel-item, handle loopback
function carouselNext(pageName) {
    let current = sessionStorage.getItem(`${pageName}Current`);
    let items = document.getElementsByClassName('carousel-item');
    let last = items.length - 1; 

    if (current != null) {
        let next = parseInt(current) + 1;
        if (next > last) next = "0";
        carouselCycle(pageName, next);
  }
}



// go to specific sub-carousel-item (nested carousel item)
// currently doesn't have 'state' in sessionStorage 
function subCarouselCycle(id) {
    let items = document.getElementsByClassName("sub-carousel-item");  
    
    for (let item of items) {
      item.style.display = "none";
    }
  
    document.getElementById(id).style.display = "flex";
}



/*==== listener binding ====*/
// handle dev mode on window load
// do this first so that dev items get hidden properly 
sessionStorage.setItem('devMode', 'false');
window.addEventListener("load", handleDev);

// handle portrait mode on load and on resize
window.addEventListener("load", handlePortrait);
window.addEventListener("resize", handlePortrait);


