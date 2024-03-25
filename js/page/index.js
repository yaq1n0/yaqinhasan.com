// script file for index.html specific functionality

function hideDev() {
    let devBanner = document.getElementById('under-construction');
    devBanner.style.display = 'None';
    sessionStorage.setItem('hideDev', 'true');
}

window.addEventListener('load', ( () => {
    if (sessionStorage.getItem('hideDev') == 'true') {
        hideDev();
    }
}));