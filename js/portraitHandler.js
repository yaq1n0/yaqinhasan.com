
// script file for the functions to handle portrait and landscape (narrow and widescreen viewport)

function handlePortrait() { 
    // elements that only show in landscape
    let landscape_elements = document.getElementsByClassName("show-landscape-only");
    // elements that only show in portrait
    let portrait_elements = document.getElementsByClassName("show-portrait-only");
    // get viewport width 
    let w = window.outerWidth;
    // above threshold = landscape, below threshold = portrait 
    let width_threshold = 800; 
    
    // warn user of really narrow viewport that might break the site 
    let width_warning = 300; 
    if (w <= width_warning) {
      alert("your device's viewport is narrower than this site was designed and tested for, I suggest you try landscape mode. ");
    }
  
    if (w >= width_threshold) {
      // landscape mode 
  
      // hide dropdown menu if it's down 
      if (nav_dropped == true) hideNavDropdown();
  
      // show landscape items 
      for (let i = 0; i < landscape_elements.length; i++)
        landscape_elements[i].style.display = "flex";

      // hide portrait items 
      for (let i = 0; i < portrait_elements.length; i++)
        portrait_elements[i].style.display = "none";
    } else {
      // portrait mode

      // show portrait items and 
      for (let i = 0; i < landscape_elements.length; i++)
        landscape_elements[i].style.display = "none";

      // hide landscape items 
      for (let i = 0; i < portrait_elements.length; i++)
        portrait_elements[i].style.display = "flex";
    }
  }
  
// handle portrait mode on load and on resize 
window.addEventListener('load', handlePortrait);
window.addEventListener('resize', handlePortrait);
