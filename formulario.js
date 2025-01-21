const btnBuscar = document.getElementById("btnBuscar");
const legajoInput = document.getElementById("legajoInput");
const formulario = document.getElementById("formulario");
const volver = document.getElementById('btnVolver');


// Función para obtener los datos del API
async function obtenerDatos(legajo) {
  const API_URL = `http://localhost:3000/api/datos/${legajo}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const datos = await response.json();
    renderizarDatos(datos);
    formulario.style.display = "flex"; // Muestra el formulario al obtener datos
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    alert("No se encontraron datos para el legajo ingresado.");
  }
}

// Función para renderizar los datos en el formulario
function renderizarDatos(datos) {
  const fotoContainer = document.getElementById("foto");

  // Construir la ruta de la foto según el número de legajo
  const legajo = datos.LEGAJO;
  console.log(legajo); // Asegúrate de que 'datos' contiene una propiedad 'LEGAJO'
  const fotoRuta = `../fotos/${legajo}.jpg`;

  // Renderizar la foto o manejar el caso donde no existe
  if (legajo) {
    fotoContainer.innerHTML = `<img src="${fotoRuta}" alt="Foto del personal"/>`;
  } else {
    fotoContainer.innerHTML = "Sin foto";
  }

  const detallesContainer = document.getElementById("detalles");
  detallesContainer.innerHTML = ""; // Limpia el contenedor

  const campos = [
    { label: "Nombre y Apellido", value: datos['NOMBRES y APELLIDO'] },
    { label: "Destino", value: datos.DESTINO },
    { label: "Jerarquía", value: datos.JERARQUIA },
    { label: "Legajo", value: datos.LEGAJO },
    { label: "Agrupamiento", value: datos['AGR.'] },
    { label: "Función", value: datos.FUNCION },
    { label: "Partido domicilio", value: datos['PARTIDO DOMICILIO'] },
    { label: "Edad", value: datos.EDAD },
    { label: "Antigüedad", value: datos['ANTIGÜEDAD'] },
    { label: "Posición puesto", value: datos['POSICION PUESTO'] },
    { label: "Último ascenso", value: datos['ULTIMO ASCENSO'] },
    { label: "Arma provista", value: datos['ARMA PROVISTA'] },
    { label: "Numeración", value: datos['NUMERACION'] },
    { label: "Chaleco", value: datos.CHALECO },
    { label: "Serie", value: datos.SERIE },
    { label: "Estado", value: datos['ACTIVO/JMD/JMS/RMH/RAT'] },
    { label: "Diagnóstico detallado", value: datos['DIAGNOSTICO DETALLADO (NO CIE)'] },
    { label: "Desde/Hasta", value: datos['DESDE/HASTA'] },
  ];

  campos.forEach(campo => {
    const div = document.createElement("div");
    div.innerHTML = `<label>${campo.label}:</label> <span>${campo.value || "N/A"}</span>`;
    detallesContainer.appendChild(div);
  });
}

// Evento de clic en el botón Buscar
btnBuscar.addEventListener("click", () => {
  const legajo = legajoInput.value.trim();
  if (!legajo) {
    alert("Por favor, ingrese un legajo válido.");
    return;
  }
  obtenerDatos(legajo);
});

volver.addEventListener('click', () => {
  window.location.href = './index.html'
});
