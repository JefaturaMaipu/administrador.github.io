const listado = document.getElementById('listado');
const efectivo = document.getElementById('efectivo');
const armamento = document.getElementById('armamento');
const chaleco = document.getElementById('chaleco');

listado.addEventListener('click', () =>  {
    window.location.href = '../public/tabla.html'
});

efectivo.addEventListener('click', () =>  {
    window.location.href = '../public/formulario.html'
});

armamento.addEventListener('click', () => {
    window.location.href = '../public/armamento.html'
});

chaleco.addEventListener('click', () => {
    window.location.href = '../public/chaleco.html'
});

