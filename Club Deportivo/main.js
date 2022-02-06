const express = require('express');
const fs = require('fs');
const url = require('url');

const app = express();

app.get('/', (request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile('./www/public/index.html', 'utf-8', (err, data) => {response.end(data)});

    fs.existsSync('deportes.json')? null : fs.writeFileSync('deportes.json',
    '{\n"deportes": []\n}');
});

let data  = fs.existsSync('deportes.json') ? JSON.parse(fs.readFileSync('deportes.json')) : [];

app.get('/deportes', (request, response) => {
    response.end(fs.readFileSync('deportes.json'));
});

app.get('/agregar', (request, response) => {
    const deporte = { nombre, precio } = JSON.parse(JSON.stringify(url.parse(request.url, true).query));
    
    if(!numValidator(precio)) return response.end('Precio solo acepta Numeros como valor!.');
    
    if(data.deportes.find(element => element.nombre == deporte.nombre)) return response.end('No se pueden agregar deportes repetidos!');
    data.deportes.push(deporte);
    fs.writeFileSync('deportes.json', JSON.stringify(data));
    
    response.end(`Se ha agregado satisfactoriamente el deporte ${deporte.nombre.toUpperCase()} con un precio de $${deporte.precio}.`);
});

app.get('/editar', (request, response) => {
    const deporte = { nombre, precio } = JSON.parse(JSON.stringify(url.parse(request.url, true).query));
    
    if(!numValidator(precio)) return response.end('Precio solo acepta Numeros como valor!.');
    
    fs.writeFileSync('deportes.json', JSON.stringify({deportes: data.deportes.map(element => {
        return(element.nombre == deporte.nombre) ? {nombre: element.nombre, precio: deporte.precio} : element;})}));
    
        response.end(`Se ha editado correctamente el precio de ${deporte.nombre.toUpperCase()} a $${deporte.precio}.` );
});

app.get('/eliminar', (request, response) => {
    const deporte = { nombre } = JSON.parse(JSON.stringify(url.parse(request.url, true).query));
    
    fs.writeFileSync('deportes.json', JSON.stringify({ deportes: data.deportes.filter(element => element.nombre != deporte.nombre)}));
    
    response.end(`Se ha eliminado correctamente ${deporte.nombre.toUpperCase()}.`)
});

app.listen(3000, () => {console.log('Listening PORT: 3000...')});

function numValidator(precio){
    for(let i = 0; i < precio.length; i++){
        if(!(precio.charCodeAt(i) >= 48 && precio.charCodeAt(i) <= 57)) return false;
    }
    return true;
}