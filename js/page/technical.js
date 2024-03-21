
// script file for technical.html specific functionality

// get all carousel-items in the page
const carousel_items = document.getElementsByClassName('carousel-item');

// set number of carousel-items (minus 1 to account for index start at 0)
const carousel_count = carousel_items.length - 1; 

// set the default project to open when the page first loads (if not influenced by another page in the site)
// see bottom of file for implementation of window onload listener 
const default_item = "technical0"; 
if (sessionStorage.getItem("technicalCurrent") == null) {
    sessionStorage.setItem("technicalCurrent", default_item);
}

// show the carousel-item by id but not the rest of the carousel-items
function cycleItem(item_id) {
  for (let i = 0; i < carousel_items.length; i++) {
    carousel_items[i].style.display = "none";
  }
  document.getElementById(item_id).style.display = "flex";
  sessionStorage.setItem("technicalCurrent", item_id); // set current item in sessionStorage
}

// go to the previous item, handle loopback
function previousItem() {
  let current = sessionStorage.getItem("technicalCurrent");
  if (current != null) {
    let current_id = parseInt(current.replace("technical", ""));
    let previous_id = current_id - 1;
    if (previous_id < 0) previous_id = carousel_count;
    cycleItem("technical" + previous_id);
  }
}

// go to the next item, handle loopback
function nextItem() {
    let current = sessionStorage.getItem("technicalCurrent");
    if (current != null) {
      let current_id = parseInt(current.replace("technical", ""));
      let next_id = current_id + 1;
      if (next_id > carousel_count) next_id = 0;
      cycleItem("technical" + next_id);
    }
  }

// cycle the item to the currentproject on window load
window.addEventListener('load', cycleItem(sessionStorage.getItem("technicalCurrent")));
