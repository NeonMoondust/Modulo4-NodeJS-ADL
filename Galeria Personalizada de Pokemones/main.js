const axios = require('axios');
const fs = require('fs');
const express = require('express');

const app = express();

const API_to_consult = 'https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=150';

app.get('/', (request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile('index.html', 'utf-8', (err, data) => {response.end(data)});
});

app.get('/pokemones', async (request, response) => {
    const API_data = await axios.get(API_to_consult).then(data => data.data.results)
                                .catch(e => {console.log(e);});
    response.end(JSON.stringify(await Promise.all(API_data.map(element => new Promise((resolve, reject) =>{
        resolve(getPokemonObj(element.url))
    })))));
});

app.listen(3000,  () =>
    console.log("Listening port: 3000...")
);

async function getPokemonObj(url){
    const API_data = await axios.get(url).then(data => data.data)
                                .catch(e => {console.log(e);});
    return({nombre: API_data.pokemon.name, img: API_data.sprites.front_default});
}