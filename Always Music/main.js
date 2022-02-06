const { Client } = require('pg');
const argv = process.argv.slice(2);

const PSQL_CONFIG = {
    user: 'cristobal',
    host: 'localhost',
    database: 'always_music',
    password: 'desafio',
    port: 5432
};

const client = new Client(PSQL_CONFIG);

client.connect();

 async function main(){
    let results;
    switch(argv[0]){
        case 'consulta':
            results = await readData();
            console.log('Registro actual', results.rows);
            break;
        case 'nuevo':
            results = await addData(argv[1], argv[2], argv[3], argv[4]);
            console.log(`Estudiande ${results.rows[0].nombre} agregado con exito.`);
            break;
        case 'editar':
            results = await updateData(argv[1], argv[2], argv[3], argv[4]);
            console.log(`Estudiande ${results.rows[0].nombre} editado con exito.`);
            break;
        case 'eliminar':
            await deleteData(argv[1]);
            console.log(`Registro de estudiande con rut ${argv[1]} eliminado.`);
            break;
        default:
            results = await readDataWithCondition(argv[1]);
            console.log(results.rows);
            break;
    }
    client.end();
 }

async function addData(nombre, rut, curso, nivel){
    return await client.query({
        text: 'INSERT INTO estudiante(nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [nombre, rut, curso, nivel]
    })
}

async function readData(){
    return await client.query({text: 'SELECT * FROM estudiante'});
}

async function readDataWithCondition(to_compare){
    return await client.query({
        text: 'SELECT * FROM estudiante WHERE rut=$1',
        values: [to_compare]
    });
}

async function updateData(nombre, rut, curso, nivel){
    return await client.query({
        text: `UPDATE estudiante SET nombre=$1, rut=$2, curso=$3, nivel=$4 WHERE nombre=$1 RETURNING *;`,
        values: [nombre, rut, curso, nivel]
    });
}

async function deleteData(to_compare){
    await client.query({
        text: 'DELETE FROM estudiante WHERE rut=$1',
        values: [to_compare]
    });
}


main();