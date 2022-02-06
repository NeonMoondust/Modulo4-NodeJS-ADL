const { Pool } = require('pg');
const argv = process.argv.slice(2);

const PSQL_CONFIG = {
    user: 'cristobal',
    host: 'localhost',
    database: 'always_music',
    password: 'desafio',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(PSQL_CONFIG);
let client;

async function main(){
    let results;
    try{
        client = await pool.connect();
    }catch(e){
        console.log(`Ha habido un error de conexion con el codigo: ${e.code}.\nFavor revisar los datos de autenticacion y volver a intentarlo.`);
        return;
    }
    try{
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
    }catch(e){
        console.log(`Ha habido un error dentro de la query con el codigo: ${e.code}`);
    }finally{
        client.release();
        pool.end();
    }
}

async function addData(nombre, rut, curso, nivel){
    return await client.query({
        name: 'add_data',
        text: 'INSERT INTO estudiante(nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [nombre, rut, curso, nivel]
    });
}

async function readData(){
    return await client.query({
        name: 'read_data',
        text: 'SELECT * FROM estudiante',
        rowMode: 'array'
    });
}

async function readDataWithCondition(to_compare){
    return await client.query({
        name: 'read_conditional_data',
        text: 'SELECT * FROM estudiante WHERE rut=$1',
        values: [to_compare],
        rowMode: 'array'
    });
}

async function updateData(nombre, rut, curso, nivel){
    return await client.query({
        name: 'update_data',
        text: `UPDATE estudiante SET nombre=$1, rut=$2, curso=$3, nivel=$4 WHERE nombre=$1 RETURNING *;`,
        values: [nombre, rut, curso, nivel]
    });
}

async function deleteData(to_compare){
    await client.query({
        name: 'delete_data',
        text: 'DELETE FROM estudiante WHERE rut=$1',
        values: [to_compare]
    });
}

main();