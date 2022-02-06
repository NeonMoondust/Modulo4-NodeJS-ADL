const Jimp = require('jimp');
const http = require('http');
const fs = require('fs');
const yargs = require('yargs');
const url = require('url');

const key = 123;

yargs.command('runit', 'testing the key in order to run the server.', {
    key: {
        describe: 'clave',
        demand: true,
        alias:'k'
    },

},
args => {
    if(args.key = key){
        http.createServer((request, response) => {
            const params = url.parse(request.url, true).query;

            if(request.url == '/'){
                fs.readFile('index.html', 'utf-8', (err, file) => {
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(file);
                });
            }
            
            if(request.url == '/image'){
                console.log(params.imagen);
                Jimp.read(params.imagen, (err, paisaje) => {
                if (err) throw err;
                paisaje.resize(350, Jimp.AUTO).greyscale().quality(60).writeAsync('newImg.jpg').then(() =>{
                  fs.readFile('newImg.jpg', (err, imagen) =>{
                    response.writeHead(200, {'Content-Type' : 'image/jpeg'});
                    response.end(imagen);
                  });
                });
              });
            }
            
            if(request.url == '/styles'){
                fs.readFile('style.css', (err, file) => {
                    response.writeHead(200, {'Content-Type':'text/css'});
                    response.end(file);
                });
            }
        }).listen(8080, () => console.log("Listening port 8080"));
    }else{
        console.log('Wrong key. Try again.');
    }
}).help().argv;