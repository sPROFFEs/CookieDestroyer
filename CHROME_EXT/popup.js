
document.getElementById('ejecutar').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('abrirOtroDocumento').addEventListener('click', function () {
  chrome.tabs.create({ url: '/index.html' });
});




