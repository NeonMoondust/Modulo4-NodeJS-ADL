//NO ME ODIES JOHN POR EL CODIGO :( LO HICE A TODOGAS LITERAL X)

const axios = require('axios');
const fs = require('fs');
const express = require('express');
const url = require('url')
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("./mailer.js");

const app = express();

const API_to_consult = 'https://mindicador.cl/api';

app.get('/', (request, response) =>{
    response.setHeader("content-type", "text/html");
    fs.readFile("index.html", "utf8", (err, data) => {
        response.end(data);
    });
});

app.get('/mailing', async (request, response) =>{
    const { correos, asunto, contenido } = url.parse(request.url, true).query;
    
    const {data} = await axios.get(API_to_consult);

    const template = `Hola! Los indicadores económicos de hoy son los siguientes:\n\n
                      El valor del dólar del día de hoy es: ${data.dolar.valor} \n
                      El valor del euro del día de hoy es: ${data.euro.valor} \n
                      El valor de la uf del día de hoy es: ${data.uf.valor} \n
                      El valor de la utm del día de hoy es: ${data.utm.valor}`;

    sendEmail(correos, asunto, contenido + template).then((err, data) => {
        if (err) {
            response.write(`<p>No se pudo enviar el correo</p>`)
            response.end()
        } else {
            response.write(`<p>Correos enviados con exito</p>`)
            response.end()
        }
        const backup = `Asunto: ${asunto}
                        Contenido: ${contenido}\n${template}`
        

        fs.stat('./correos', function(err) {
            if(err){
                if (err.code === 'ENOENT') {
                    fs.mkdir('./correos', () => {
                        correos.split(',').forEach(element => {
                            fs.writeFile(`./correos/${uuidv4().substring(0, 6)}.txt`, `Correo: ${element}\n${backup}`, "utf-8", (err, data) => {
                                if (err) {
                                    console.log('no se pudo crear')
                                } else {
                                    console.log('archivo creado')
                                }
                            });
                        });
                    });
                }
                return;
            }
            correos.split(',').forEach(element => {
                fs.writeFile(`./correos/${uuidv4().substring(0, 6)}.txt`, `Correo: ${element}\n${backup}`, "utf-8", (err, data) => {
                    if (err) {
                        console.log('no se pudo crear')
                    } else {
                        console.log('archivo creado')
                    }
                });
            });
        });
    });
});


app.listen(3000,  () =>
    console.log("Listening port: 3000...")
);