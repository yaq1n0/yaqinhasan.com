// Javascript file for about.html, projects.html, interests.html, technical.html

function openAll() {
  let elements = document.getElementsByClassName("collapsible");
  for (var i = 0; i < elements.length; i++) {
    elements[i].open = true;
  }
}

function closeAll() {
  let elements = document.getElementsByClassName("collapsible");
  for (var i = 0; i < elements.length; i++) {
    elements[i].open = false;
  }
}

/* go to the specified detail element by id, and open it */
function gotoElement(element_id) {
  document.getElementById(element_id).open = true;
  document.getElementById(element_id).scrollIntoView();
}
