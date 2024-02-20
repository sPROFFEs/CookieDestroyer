let variablesRe;
function cargarVariables() {
    // Recupera la variable desde el almacenamiento local
    chrome.storage.local.get(['variables'], function (result) {
        variablesRe = result.variables;
        // Iterar sobre las variables y llamar a las funciones con cada variable
        for (let i = 0; i < variablesRe.length; i++) {
            deleteCookiesPop(variablesRe[i]);
            scrollON(variablesRe[i]);
            console.log(variablesRe[i]);
        }
    });
}

function deleteCookiesPop(variable) {
    let cookie = document.getElementById(variable);
    if (cookie) {
        cookie.remove();
    }
}

function scrollON(variable) {
    let element = document.querySelector('body');
    element.style.overflow = "auto";
    element.classList.remove(variable);
}

document.body.onload = cargarVariables();

