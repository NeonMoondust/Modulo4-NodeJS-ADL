const http = require('http');
const fs = require('fs');
const url = require('url');

const temp_date = new Date().toLocaleDateString().split('/');
const current_date = (new Date().getDate() < 10) ? `0${temp_date[1]}/${temp_date[0]}/${temp_date[2]}`:
                                                    `${temp_date[1]}/${temp_date[0]}/${temp_date[2]}`;

http.createServer((request, response) =>{
    const params = url.parse(request.url, true).query;

    switch(request.url.split('?')[0]){
        case '/crear':
            fs.writeFile(params.archivo, `${current_date}\n${params.contenido}`, 'utf-8', (err) => {
                if (err) {
                    response.write('El Archivo no ha podido ser creado!');
                    response.end();
                }
                response.write('Archivo creado con exito!');
                response.end();
            });
            break;
        case '/leer':
            fs.readFile(params.archivo, 'utf-8', (err, data) =>{
                if (err) {
                    response.write('El Archivo no ha podido ser leido!');
                    response.end();
                }
                response.write(data);
                response.end();
            });
            break;
        case "/renombrar":
            fs.rename(params.nombre, params.nuevoNombre, (err) => {
                if (err) {
                    response.write('El Archivo no ha podido ser renombrado!');
                    response.end();
                }
                response.write('Archivo Renombrado!\n');
                response.write(`Nombre anterior: ${params.nombre} - Nombre nuevo: ${params.nuevoNombre}`);
                response.end();
            });
            break;
        case "/eliminar":
            fs.unlink(params.archivo, (err) =>{
                if (err) {
                    response.write('El Archivo no ha podido ser eliminado!');
                    response.end();
                }
                response.write(`Tu solicitud para eliminar el archivo ${params.archivo} se esta procesando\n`);
                setTimeout(() => {
                    response.write(`Tu solicitud ha sido aceptada. Se ha eliminado ${params.archivo} con exito!`);
                    response.end();
                }, 3000);
            });
            break;
        default:
            break;
    }

}).listen(8080, () => console.log('Listening...'))