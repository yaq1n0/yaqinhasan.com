
// script file for functions that handle carousel layout

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


// sub-carousel item functions 
// a sub carousel is a carousel in a carousel (nested)
// this is used in about.html

// go to specific sub-carousel-item
// currently doesn't have 'state' in sessionStorage
function subCarouselCycle(id) {
    let items = document.getElementsByClassName("sub-carousel-item");  
    
    for (let item of items) {
      item.style.display = "none";
    }
  
    document.getElementById(id).style.display = "flex";
}