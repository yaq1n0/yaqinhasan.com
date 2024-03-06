

function handlePortrait() {
    /* function to handle objects that only render on 
    landscape (wide screen) or portrait (narrow screen) 
    above width_threshold = wide, below = narrow
    */
    let w = window.outerWidth;
    let width_threshold = 600;
    let landscape_elements = document.getElementsByClassName('show-landscape-only');
    let portrait_elements = document.getElementsByClassName('show-portrait-only');

    if (w >= width_threshold) {
        /* landscape */
        for (var i=0; i<landscape_elements.length; i++) {
            landscape_elements[i].style.display = 'flex';
        }
        for (var i=0; i<portrait_elements.length; i++) {
            portrait_elements[i].style.display = 'none';
        }
    } else {
        /* portrait */
        for (var i=0; i<landscape_elements.length; i++) {
            landscape_elements[i].style.display = 'none';
        }
        for (var i=0; i<portrait_elements.length; i++) {
            portrait_elements[i].style.display = 'flex';
        }
    }
}

window.onload = handlePortrait();

