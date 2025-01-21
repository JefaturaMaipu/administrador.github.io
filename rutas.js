const { Router } = require('express');
const XLSX = require('xlsx');
const path = require('path');

const router = Router();

// Función para leer datos desde el archivo Excel
function leerExcel(rutaArchivo) {
    const workbook = XLSX.readFile(rutaArchivo);
    const hoja = workbook.Sheets[workbook.SheetNames[0]];

    // Convertir a JSON con defval para manejar celdas vacías
    return XLSX.utils.sheet_to_json(hoja, { defval: "" });
}

// Ruta para obtener todos los datos
router.get('/', (req, res) => {
    try {
        const rutaExcel = path.join(__dirname, './public/RP 2100.xlsx'); // Ruta del archivo
        const datos = leerExcel(rutaExcel);
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo Excel' });
    }
});

router.get('/:legajo', (req, res) => {
    try {
        const legajo = parseInt(req.params.legajo);
        const rutaExcel = path.join(__dirname, './public/RP 2100.xlsx');
        const datos = leerExcel(rutaExcel);

        const registro = datos.find((dato) => dato.LEGAJO === legajo);
        if (registro) {
            res.json(registro);
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// Ruta para obtener los datos filtrados de chalecos
router.get('/chalecos', (req, res) => {
    try {
        const rutaExcel = path.join(__dirname, './public/RP 2100.xlsx');
        const datos = leerExcel(rutaExcel);

        // Filtrar las columnas requeridas
        const datosFiltrados = datos.map((fila) => ({
            DESTINO: fila.DESTINO || null,
            JERARQUIA: fila['ORDEN JERAR'] || null,
            AGRUP: fila.AGR || null,
            APELLIDO_y_NOMBRE: fila['NOMBRES y APELLIDO'] || null,
            LEGAJO: fila.LEGAJO || null,
            CHALECO: fila.CHALECO || null,
            SERIE: fila.SERIE || null,
        }))
        // Eliminar filas vacías y excluir las que tienen "NO POSEE" en CHALECO
        .filter(fila => 
            Object.values(fila).some(valor => valor !== null && valor !== '') &&
            fila.CHALECO !== 'NO POSEE'
        );

        res.json(datosFiltrados);
    } catch (error) {
        console.error('Error al procesar el archivo Excel:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

module.exports = router;

