document.getElementById('ejecutar').addEventListener('click', function () {
  browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
    browser.tabs.reload(tabs[0].id);
  });
});

document.getElementById('abrirOtroDocumento').addEventListener('click', function () {
  browser.tabs.create({ url: '/index.html' });
});
