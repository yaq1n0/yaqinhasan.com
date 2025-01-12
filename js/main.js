/* main JavaScript file for yaqinhasan.com */

/*==== "globals" ====*/
var portraitMode = false; 
var overflowShown = false;

/*==== portrait mode related JavaScript ====*/
function getPortraitElems() {
  let portraitElems = document.getElementsByClassName("show-portrait-only");
  return portraitElems;
}

function getLandscapeElems() {
  let landscapeElems = document.getElementsByClassName("show-landscape-only");
  return landscapeElems;
}

function handlePortrait() {
  // elements that only show in portrait
  let portraitElems = getPortraitElems();

  // elements that only show in landscape
  let landscapeElems = getLandscapeElems();

    
  // nav divider item
  let navDivider = document.getElementById("nav-divider");

  // page shortcuts menus (for about, projects, interestes, technical)
  let pageShortcutsMenu = document.getElementById("page-shortcuts");


  // get viewport width
  let w = document.documentElement.clientWidth;

  // above threshold = landscape, below threshold = portrait
  let widthThreshold = 900;
  
    if (w >= widthThreshold) {
      // show landscape items (but respect dev mode)
      for (let elem of landscapeElems) {
        if (!elem.classList.contains('show-dev-only') || getDev() === 'true') {
          elem.style.display = "flex";
        }
      }
  
      // hide portrait items
      for (let elem of portraitElems) elem.style.display = "none";

      // show page shortcuts by default
      if (pageShortcutsMenu != null) pageShortcutsMenu.open = true;

      // show nav bar divider
      navDivider.style.display = 'flex';
    } else {
      // hide landscape items
      for (let elem of landscapeElems) elem.style.display = "none";
  
      // show portrait items (but respect dev mode)
      for (let elem of portraitElems) {
        if (!elem.classList.contains('show-dev-only') || getDev() === 'true') {
          elem.style.display = "flex";
        }
      }

      // hide page shortcuts by default
      if (pageShortcutsMenu != null) pageShortcutsMenu.open = false;

      // hide nav bar divider
      navDivider.style.display = 'none';

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
  for (let item of overflowItems) {
    item.style.display = 'flex';
  }

  // handle dev only items
  handleDev();

  dropdownIcon.style.transform = 'rotate(90deg)'; // rotate icon to dropped down
  overflowShown = true;
}

// hide nav var overflow icons
function hideNavOverflow() {
  let overflowItems = document.getElementsByClassName('overflow-item');
  let dropdownIcon = document.getElementById('dropdown-icon');

  // hide all dropdown elements
  for (let item of overflowItems) {
    item.style.display = 'none';
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
function getDev() {
  let devMode = sessionStorage.getItem('devMode');
  return devMode;
}

function setDev(val) {
  sessionStorage.setItem('devMode', val);
}

function getDevItems() {
  let devItems = document.getElementsByClassName('show-dev-only');
  return devItems;
}

// call this to handle hiding and showing dev items
function handleDev() {
    let devMode = getDev(); 
    let devItems = getDevItems()
    let toggle = document.getElementById('dev-toggle');

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
        setDev('true');
    } else if (toggle.checked == false) {
        setDev('false');
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
function initializeEventListeners() {
  try {
    // Initialize dev mode if not set
    if (sessionStorage.getItem('devMode') === null) {
      sessionStorage.setItem('devMode', 'false');
    }

    // Portrait mode handling
    if (window.matchMedia) {
      // Use modern matchMedia if available
      const mediaQuery = window.matchMedia('(min-width: 900px)');
      mediaQuery.addEventListener('change', handlePortrait);
    }
    
    // Fallback to resize event if matchMedia not supported
    window.addEventListener('resize', handlePortrait);
    
    // Initial portrait check and dev mode setup
    document.addEventListener('DOMContentLoaded', () => {
      handlePortrait();
      // Additional initialization can go here
    });

    // Final initialization after all resources are loaded
    window.addEventListener('load', () => {
      handleDev();
      handlePortrait(); // One final check to ensure correct display
    });

  } catch (error) {
    console.error('Error initializing event listeners:', error);
  }
}

// Initialize all event listeners
initializeEventListeners();


