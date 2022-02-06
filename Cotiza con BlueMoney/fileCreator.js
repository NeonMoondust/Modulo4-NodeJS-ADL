const file_system = require("fs");

const argv = process.argv.slice(2);

const parsed_text = argv[2].replaceAll('|Jump-Line|', '\n');

file_system.writeFile(`${argv[0]}.${argv[1]}`, parsed_text, 'utf-8', () => {
     file_system.readFile(`${argv[0]}.${argv[1]}`, 'utf-8', (err, data) =>{
        console.log(data);
     });
});