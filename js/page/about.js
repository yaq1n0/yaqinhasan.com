
// script file for about.html specific functionality

// get all carousel-items in the page
const carousel_items = document.getElementsByClassName('carousel-item');

// set number of carousel-items (minus 1 to account for index start at 0)
const carousel_count = carousel_items.length - 1; 

// set the default about item to open when the page first loads (if not influenced by another page in the site)
// see bottom of file for implementation of window onload listener 
const default_item = "about0"; 
if (sessionStorage.getItem("aboutCurrent") == null) {
    sessionStorage.setItem("aboutCurrent", default_item);
}

// show the carousel-item by id but not the rest of the carousel-items
function cycleItem(item_id) {
  for (let i = 0; i < carousel_items.length; i++) {
    carousel_items[i].style.display = "none";
  }
  document.getElementById(item_id).style.display = "flex";
  sessionStorage.setItem("aboutCurrent", item_id); // set current item in sessionStorage
}

// show the carousel-item by id but not the rest of the carousel-items
function cycleSubItem(item_id) {
    let sub_items = document.getElementsByClassName("sub-carousel-item");
    for (let i = 0; i < sub_items.length; i++) {
        sub_items[i].style.display = "none";
    }
    document.getElementById(item_id).style.display = "flex";
}

// go to the previous item, handle loopback
function previousItem() {
  let current = sessionStorage.getItem("aboutCurrent");
  if (current != null) {
    let current_id = parseInt(current.replace("about", ""));
    let previous_id = current_id - 1;
    if (previous_id < 0) previous_id = carousel_count;
    cycleItem("about" + previous_id);
  }
}

// go to the next item, handle loopback
function nextItem() {
    let current = sessionStorage.getItem("aboutCurrent");
    if (current != null) {
      let current_id = parseInt(current.replace("about", ""));
      let next_id = current_id + 1;
      if (next_id > carousel_count) next_id = 0;
      cycleItem("about" + next_id);
    }
  }

// cycle the item to the currentproject on window load
window.addEventListener('load', cycleItem(sessionStorage.getItem("aboutCurrent")));
window.addEventListener('load', cycleSubItem("year3"));
