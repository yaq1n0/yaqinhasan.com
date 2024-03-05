// Javascript file for projects.html

var project_ids = ['project0', 'project1', 'project2', 'project3', 'project4', 'project5'];

function openAll() {
    let elements = document.getElementsByClassName('collapsible-projects');
    for (var i=0; i<elements.length; i++) {
        elements[i].open = true;
    }
}

function closeAll() {
    let elements = document.getElementsByClassName('collapsible-projects');
    for (var i=0; i<elements.length; i++) {
        elements[i].open = false;
    }
}

function gotoProject(project_id) {
    document.getElementById(project_id).open = true;
    document.getElementById(project_id).scrollIntoView();
}
