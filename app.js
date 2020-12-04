const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
var colors = require('colors');

//console.log(argv);

let comando = argv._[0];

switch(comando){

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        //console.log('Crear un elemento por hacer');
    break;

    case 'listar':
        let listado = porHacer.getListado();
        for(let tarea of listado){
            console.log('===Por Hacer==='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==============='.green);
        }
        //console.log('Mostrar todas las tareas por hacer');
    break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        //console.log('Actualiza una tarea por hacer');
    break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
    break;

    default:
        console.log('Comando no es reconocido');
}