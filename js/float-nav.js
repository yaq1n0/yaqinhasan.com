
// script file for the functions used by the float-nav buttons

var collapsible_elements = document.getElementsByClassName("collapsible");


function openAll() {
  for (var i = 0; i < collapsible_elements.length; i++) {
    collapsible_elements[i].open = true;
  }
}


function closeAll() {
  for (var i = 0; i < collapsible_elements.length; i++) {
    collapsible_elements[i].open = false;
  }
}

