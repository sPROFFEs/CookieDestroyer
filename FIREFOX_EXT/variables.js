// Estado interno para mantener las variables
let variables = [null];

// Inicializar variables desde el estado interno al cargar la página
cargarVariables();

// Función para cargar las variables desde el almacenamiento local
function cargarVariables() {
    const camposVariables = document.getElementById('camposVariables');
    limpiarElemento(camposVariables);

    // Obtener las variables desde el almacenamiento local
    variables = JSON.parse(localStorage.getItem('variables')) || [];

    variables.forEach((valor, index) => {
        const nuevoCampo = crearCampo(index + 1, valor);
        camposVariables.appendChild(nuevoCampo);
    });

    // Mostrar variables guardadas
    mostrarVariablesGuardadas();
}

// Función para guardar las variables en el almacenamiento local
function guardarVariables() {
    const camposEntrada = document.getElementsByClassName('variable');
    variables = [];

    for (let i = 0; i < camposEntrada.length; i++) {
        const valor = camposEntrada[i].value;
        variables.push(valor.trim());
    }

    // Guardar variables en el almacenamiento local
    localStorage.setItem('variables', JSON.stringify(variables));
    browser.storage.local.set({ 'variables': variables });

    // Mostrar variables guardadas
    mostrarVariablesGuardadas();

    browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        browser.tabs.reload(tabs[0].id);
    });
}

// Función para eliminar todas las variables guardadas
function eliminarVariables() {
    // Limpiar las variables en el almacenamiento local
    localStorage.removeItem('variables');
    variables = [];

    // Limpiar campos de entrada y mostrar las variables
    cargarVariables();

    browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        browser.tabs.reload(tabs[0].id);
    });
}

// Función para añadir un nuevo campo de entrada
function agregarCampo() {
    // Añadir un nuevo campo en el estado interno
    variables.push("");

    // Crear y agregar el nuevo campo al final
    const camposVariables = document.getElementById('camposVariables');
    const nuevoCampo = crearCampo(variables.length, "");
    camposVariables.appendChild(nuevoCampo);
}

// Función para crear un nuevo campo de entrada
function crearCampo(indice, valor) {
    const nuevoCampo = document.createElement('div');

    const label = document.createElement('label');
    label.setAttribute('for', `variable${indice}`);
    label.textContent = `Elemento ${indice}:`;
    nuevoCampo.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('variable');
    input.value = valor;
    nuevoCampo.appendChild(input);

    return nuevoCampo;
}

// Función para mostrar las variables guardadas
function mostrarVariablesGuardadas() {
    const variablesGuardadas = document.getElementById('variablesGuardadas');
    limpiarElemento(variablesGuardadas);

    variables.forEach((valor, index) => {
        const parrafo = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = `Elemento ${index + 1}:`;
        parrafo.appendChild(strong);
        const span = document.createElement('span');
        span.textContent = valor;
        parrafo.appendChild(span);
        variablesGuardadas.appendChild(parrafo);
    });
}

// Función para limpiar un elemento eliminando sus nodos hijos
function limpiarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

document.getElementById('add').addEventListener('click', agregarCampo);
document.getElementById('save').addEventListener('click', guardarVariables);
document.getElementById('delete').addEventListener('click', eliminarVariables);
