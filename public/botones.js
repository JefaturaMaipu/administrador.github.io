const listado = document.getElementById('listado');
const efectivo = document.getElementById('efectivo');
const armamento = document.getElementById('armamento');
const chaleco = document.getElementById('chaleco');

listado.addEventListener('click', () =>  {
    window.location.href = './tabla.html'
});

efectivo.addEventListener('click', () =>  {
    window.location.href = './formulario.html'
});

armamento.addEventListener('click', () => {
    window.location.href = './armamento.html'
});

chaleco.addEventListener('click', () => {
    window.location.href = './chaleco.html'
});

