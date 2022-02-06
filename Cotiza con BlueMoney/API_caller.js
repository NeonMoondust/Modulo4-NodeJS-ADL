const https = require("https");
const argv = process.argv.slice(2);

https.get('https://mindicador.cl/api', (response) => {
    response.on('data', (data) => {
        console.log(Object.values(JSON.parse(data)).find(element => element.codigo == argv[0]).valor);
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});