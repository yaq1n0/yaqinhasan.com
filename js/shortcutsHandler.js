
// script file for the site redirect functions

// function to goto a local element in the same page
function gotoElement(element_id) {
    document.getElementById(element_id).open = true;
    document.getElementById(element_id).scrollIntoView();
  }
  

/* function to handle opening elements in another page 
takes a page_name and an element_id as a parameter, 
then creates a sessionStorage "_opened" item for it to save this information*/
function openPageElement(page_name, element_id) {
    // convert element_id into session storage item_id
    ssID = page_name + "_" + element_id + "_opened";
    sessionStorage.setItem(ssID, true);
}


/* generic function to handle shortcuts for a page
this gets called by <page_name>Shortcuts functions in other individual page .js files with their page name passed as a variable*/
function handleShortcuts(page_name) {
  for (let i = 0; i < sessionStorage.length; i++) {
    // sessionStorage key
    let ss_key = sessionStorage.key(i);

    // if sessionStorage key contains 'projects' and 'opened'
    if (ss_key.includes(page_name + "_") && ss_key.includes('_opened')) {
      // strip the 'projects_' and '_opened' to get just the element id
      ss_key = ss_key.replace(page_name + "_", "");
      ss_key = ss_key.replace('_opened', "");
      let elem = document.getElementById(ss_key);
      if (elem != null) {
        // if the element_id actually corresponds to something
        elem.open = true;
        
        // deal with scrolling the element into view
        elem.scrollIntoView();

        // then delete the sessionStorage "_opened" item
        sessionStorage.removeItem(sessionStorage.key(i));
      }
    }
  }
}

