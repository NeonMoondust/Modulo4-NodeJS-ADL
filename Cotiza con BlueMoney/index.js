//"Importando" el modulo de "child_process"
const child_process = require('child_process');

//Cortando el array a partir del indice 2 para eliminar los 2 primeros indices que corresponden a la rutas de los archivos en cuestion
const argv = process.argv.slice(2);

//Guardando cada argumento en su respectiva variable para legibilidad del codigo
const file_name = argv[0],
      file_extension = argv[1],
      currency_type = argv[2],
      clp_ammount = argv[3];

//Llama al metodo que retornará la fecha en su syntaxis requerida por el desafio.
let date = get_current_Date();

//Funcion que ejecuto el metodo de ejecucion del modulo "Child_process" invocando un shell y simulando comandos por consolas
//Retornando el stdout y el stderror
function execute(command) {
    return new Promise((resolve) => {
        child_process.exec(`node ${command}`, function (err, result) {
            resolve(result)
        });
    });
};

//Ejecucion del archivo API_caller.js con sus respectivos argumentos
execute(`API_caller.js ${currency_type}`).then((promise) => {
    //Conversion de la moneda
    const price_converted = (+clp_ammount) / (+promise);
    //El texto a mostrar
    //por consola no parece soportar los saltos de linea por lo que los paso como string para luego ser reemplazados
    const text_to_show = `A la fecha: ${date}|Jump-Line|Fue realizada cotizacion con los siguientes datos:|Jump-Line|Cantidad de pesos a convertir: ${clp_ammount} pesos|Jump-Line|Convertido a "${currency_type}" da un total de:|Jump-Line|$${price_converted.toString()}`;
    
    //Ejecucion del archivo fileCreator.js con sus respectivos argumentos
    execute(`fileCreator.js ${file_name} ${file_extension} "${text_to_show}"`).then(promise => {
        console.log(promise);
    });
});

//Obtiene del dia de hoy con el formato requerido en el desafio.
function get_current_Date(){
    let temp_date = new Date().toString().split('(');
    let GMT_raw_value = new Date().getTimezoneOffset() / 60;
    let GMT_value = Math.sign(GMT_raw_value) === 1 ? `GMT-0${GMT_raw_value}:00)`:`GMT+0${GMT_raw_value}:00)`;
    return (new Date().toString().replace(`${temp_date[1]}`, GMT_value));
}