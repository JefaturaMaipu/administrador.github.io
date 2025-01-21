const volver = document.getElementById('btn_volver');

// URL del servidor que proporciona los datos
const API_URL = `http://localhost:3000/api/datos`;

let filteredData = []; // Almacenar los datos filtrados

// Obtener los datos del servidor
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    // Transformar las columnas de fecha usando la función formatExcelDate
    data.forEach(item => {
      item['ULTIMO ASCENSO'] = formatExcelDate(item['ULTIMO ASCENSO']);
      item['FECHA DE NACIMIENTO'] = formatExcelDate(item['FECHA DE NACIMIENTO']);
      item['POSICION PUESTO'] = formatExcelDate(item['POSICION PUESTO']);
      item['ING A POLICIA'] = formatExcelDate(item['ING A POLICIA']);
    });
    
    console.log(data); // Verificar los datos transformados en la consola
    displayTable(data); // Mostrar los datos en la tabla
    setupSearch(data);  // Configurar búsqueda
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = "<p>Error al cargar los datos.</p>";
  });

// Función para convertir un número de días (estilo Excel) a una fecha legible
function formatExcelDate(days) {
  const baseDate = new Date(1900, 0, 1); // 1 de enero de 1900
  const dateOffset = days > 59 ? days - 1 : days; // Ajuste por el error del año bisiesto en Excel
  return new Date(baseDate.getTime() + dateOffset * 24 * 60 * 60 * 1000).toLocaleDateString();
}

// Función para mostrar los datos como una tabla HTML
function displayTable(data) {
  const tableContainer = document.getElementById('tableContainer');
  tableContainer.innerHTML = ""; // Limpiar cualquier tabla existente

  // Crear la tabla HTML
  const table = document.createElement('table');

  // Crear la cabecera de la tabla
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Suponemos que el primer objeto en el JSON contiene las claves que serán las cabeceras
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key; // Nombre de la columna
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Crear el cuerpo de la tabla
  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(value => {
      const td = document.createElement('td');
      td.textContent = value; // Valor de la celda
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  // Añadir la tabla al contenedor en la página
  tableContainer.appendChild(table);

  // Actualizar los datos filtrados
  filteredData = data;
}

// Función para configurar la búsqueda
function setupSearch(data) {
  const searchInput = document.getElementById('searchInput');
  
  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Convertir a minúsculas
    const filtered = data.filter(row => {
      // Verificar si alguna celda contiene el término de búsqueda
      return Object.values(row).some(value => 
        value.toString().toLowerCase().includes(searchTerm)
      );
    });

    // Mostrar la tabla con los datos filtrados
    displayTable(filtered);
  });
}

volver.addEventListener('click', () => {
  window.location.href = './index.html'
});
