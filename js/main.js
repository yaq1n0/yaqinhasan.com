
// main javascript file for functionality that don't need their own file

// set pageCurrent, used to change the current carousel item in other pages, 
// could be used for more, it's really just state management
function setPageCurrent(page_name, current_id) {
    sessionStorage.setItem(page_name + "Current", current_id);
}

