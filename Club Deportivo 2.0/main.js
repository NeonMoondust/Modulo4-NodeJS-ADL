const express = require('express');
const fs = require('fs');
const url = require('url');
// const path = require('path');

const app = express();

//MiddleWare used to parse data coming from the requested object to be recognized as a JSON object
app.use(express.json());

let validator_message = 'Error!.';

// app.use(express.urlencoded({extended: false}));
// app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile('./index.html', 'utf-8', (err, data) => {response.end(data)});

    fs.existsSync('data.json')? null : fs.writeFileSync('data.json',
    '{\n"deportes": []\n}');
});

let data  = fs.existsSync('data.json') ? JSON.parse(fs.readFileSync('data.json')) : [];

app.get('/deportes', (request, response) => {
    response.end(fs.readFileSync('data.json'));
});

//PAYLOAD 'DATA' it comes on the body, so request.body bring us the JSON OBJECT body of the request and parsed via MiddleWare.
app.post('/agregar', (request, response) => {
    const deporte = { nombre, precio } = request.body;
    if(!Validator(nombre, precio)) return response.end(validator_message);
    
    if(data.deportes.find(element => element.nombre == deporte.nombre)) return response.end('No se pueden agregar deportes repetidos!');
    data.deportes.push(deporte);
    fs.writeFileSync('data.json', JSON.stringify(data));
    
    response.end(`Se ha agregado satisfactoriamente el deporte ${deporte.nombre.toUpperCase()} con un precio de $${deporte.precio}.`);
});

app.put('/editar', (request, response) => {
    const deporte = { nombre, precio } = request.body;
    
    if(!Validator(nombre, precio)) return response.end(validator_message);
    
    fs.writeFileSync('data.json', JSON.stringify({deportes: data.deportes.map(element => {
        return(element.nombre == deporte.nombre) ? {nombre: element.nombre, precio: deporte.precio} : element;})}));
    
        response.end(`Se ha editado correctamente el precio de ${deporte.nombre.toUpperCase()} a $${deporte.precio}.` );
});

//Semantic 'Delete Method' says that it method should never receive content on his body, 
//it can be forced it as a data payload object. But is semantically incorrect.
app.delete('/eliminar', (request, response) => {
    const deporte = { nombre } = JSON.parse(JSON.stringify(url.parse(request.url, true).query));
    
    fs.writeFileSync('data.json', JSON.stringify({ deportes: data.deportes.filter(element => element.nombre != deporte.nombre)}));
    
    response.end(`Se ha eliminado correctamente ${deporte.nombre.toUpperCase()}.`)
});

app.listen(3000, () => {console.log('Listening PORT: 3000...')});

function Validator(nombre, precio){
    if(precio === '' || nombre === '') {
        validator_message = 'Los dos campos deben ser llenados antes de enviar la solicitud!.';
        return false;
    }
    for(let i = 0; i < precio.length; i++){
        if(!(precio.charCodeAt(i) >= 48 && precio.charCodeAt(i) <= 57)) {
            validator_message = 'El campo precio solo acepta NUMEROS como valor!.'
            return false
        };
    }
    return true;
}

module.exports = app;