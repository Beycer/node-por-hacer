const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, (err) => {
        if(err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => { //cargar informacion en un archivo json

    try{
        listadoPorHacer = require('../db/data.json');
    }catch(error){
        listadoPorHacer = [];
    }
    
    //console.log(listadoPorHacer);
}


const crear = (descripcion) => {

    cargarDB();//el crear simepre haga un appen o agregando todo lo nuevo a ese archivo

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
    
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //buscar en el arreglo de listado por hacer lo que coincida con la desc
    //que la persona envia

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    //filter quitar o filtar algun elemento en particular
    let nuevoListado = listadoPorHacer.filter(tarea => {
        //voy a regresar cada uno de los elementos que no coincidan con esta condicion
        //que sea diferente a ldescripcion que estoy recibiendo, so quiere decir que ese 
        //es el elemento que yo tengo que borrar
        return tarea.descripcion !== descripcion
    });

    if(listadoPorHacer.length === nuevoListado.length){
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}



module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}