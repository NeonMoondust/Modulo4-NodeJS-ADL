const fs = require('fs');
const express = require('express');
const url = require('url');
const dataManagement = require('./modules/queries');


const app = express();

//MiddleWare used to parse data coming from the requested object to be recognized as a JSON object
app.use(express.json());

app.get('/', (request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile('./www/public/index.html', 'utf-8', (err, data) => {response.end(data)});
});

app.get('/usuarios', async (request, response) => {
    response.end(JSON.stringify(await dataManagement('user_get', [])));
});

app.post('/usuario', async (request, response) => {
    let body = '';
    request.on('data', chunk => {
        body += chunk;
    });
    request.on('end', async () => {
        body = JSON.parse(body);
        response.status(200).end(JSON.stringify(await dataManagement('user_post', [body.nombre, body.balance])));
    });
});

app.put('/usuario', async(request, response) => {
    const id_usuario = JSON.parse(JSON.stringify(url.parse(request.url, true).query)).id;
    response.status(200).end(JSON.stringify(await dataManagement('user_put', [id_usuario, request.body.name, +request.body.balance])));
});

app.delete('/usuario', async(request, response) => {
    const id_usuario = JSON.parse(JSON.stringify(url.parse(request.url, true).query)).id;
    response.status(200).end(JSON.stringify(await dataManagement('user_delete', [id_usuario])));
});

app.get('/transferencias', async(request, response) => {
    response.status(200).end(JSON.stringify(await dataManagement('transfer_get', [])));
});

app.post('/transferencia', async(request, response) =>{
    let body = '';
    request.on('data', chunk => {
        body += chunk;
    });
    request.on('end', async () => {
        body = JSON.parse(body);
        response.status(200).end(JSON.stringify(await dataManagement('transfer_post', [body.emisor, body.receptor, +body.monto, new Date()])));
    });
});

app.listen(3000, () => {console.log('Listening PORT: 3000...')});

