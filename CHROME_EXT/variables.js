// Estado interno para mantener las variables
let variables = [null];

// Inicializar variables desde el estado interno al cargar la página
cargarVariables();

// Función para cargar las variables desde el almacenamiento local
function cargarVariables() {
    const camposVariables = document.getElementById('camposVariables');
    camposVariables.innerHTML = "";  // Limpiar campos existentes

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
    chrome.storage.local.set({ 'variables': variables });

    // Mostrar variables guardadas
    mostrarVariablesGuardadas();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
}

// Función para eliminar todas las variables guardadas
function eliminarVariables() {
    // Limpiar las variables en el almacenamiento local
    localStorage.removeItem('variables');
    variables = [];

    // Limpiar campos de entrada y mostrar las variables
    cargarVariables();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
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
    nuevoCampo.innerHTML = `<label for="variable${indice}">Elemento ${indice}:</label>
                            <input type="text" class="variable" value="${valor}">`;
    return nuevoCampo;
}

// Función para mostrar las variables guardadas
function mostrarVariablesGuardadas() {
    const variablesGuardadas = document.getElementById('variablesGuardadas');
    variablesGuardadas.innerHTML = "";  // Limpiar contenido existente

    variables.forEach((valor, index) => {
        const parrafo = document.createElement('p');
        parrafo.innerHTML = `<strong>Elemento ${index + 1}:</strong> <span>${valor}</span>`;
        variablesGuardadas.appendChild(parrafo);
    });
}

document.getElementById('add').addEventListener('click', agregarCampo);
document.getElementById('save').addEventListener('click', guardarVariables);
document.getElementById('delete').addEventListener('click', eliminarVariables);