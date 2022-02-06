const { Pool, Client } = require('pg');
const moment = require("moment");
const fs = require('fs');

const { prepared_statement } = JSON.parse(fs.readFileSync('modules/queries.json'));

const PSQL_CONFIG = {
user: "cristobal",
host: "localhost",
password: "desafio",
database: "bancosolar",
port: 5432,
};

let pool;
let client = [], avalaible_clients = [];
let client_id = 0;

const all_client_data = new Map();

(async function(){
    try {
        const ghost_client = new Client(PSQL_CONFIG);
        await ghost_client.connect();
        ((await ghost_client.query(prepared_statement.user.get)).rows).forEach(user => {
            all_client_data.set(user.id, user.nombre);
        });
        ghost_client.end();
    } catch (error) {console.error(error);}
})();

async function dataManagement(method, values){
    pool = new Pool(PSQL_CONFIG);
    let data, current_client;
    try{
        current_client = await clientHandler('create', 0);
    }catch(e){
        console.error(`Ha habido un error de conexion con el codigo: ${e.code}.\nFavor revisar los datos de autenticacion y volver a intentarlo.`);
        return;
    }
    try{
        switch(method){
            case 'user_get':
                data = await readUserData(current_client);
                break;
            case 'user_post':
                prepared_statement.user.post.values = values;
                data = await addUserData(current_client);
                if(!all_client_data.has(data[0].id)) all_client_data.set(data[0].id, data[0].nombre);
                break;
            case 'user_put':
                prepared_statement.user.put.values = values;
                data = await updateUserData(current_client);
                break;
            case 'user_delete':
                prepared_statement.user.delete.values = values;
                prepared_statement.user.collateral_deletion.values = values;
                data = await deleteUserData(current_client);
                if(all_client_data.has(data[0].id)) all_client_data.delete(data[0].id);
                break;
            case 'transfer_get':
                data = await getTransfer(current_client);
                break;
            case 'transfer_post':
                prepared_statement.transfer.issuer.values = new Array(values[0], values[2]);
                prepared_statement.transfer.receptor.values = new Array(values[1], values[2]);
                // values[3] = moment(values[3]).format('yyyy-mm-ddThh:mm');
                prepared_statement.transfer.post.values = values;
                data = await newTransfer(current_client);
                break;
            default:
                console.error('Unexpected Error')
                break;
        }
    }catch(e){
        console.error(`Ha habido un error dentro de la query con el codigo: ${e.code}`);
        if(e.code === undefined) console.error(e);
    }finally{
        clientHandler('release', current_client);
        // pool.end();
        return data;
    }
}

async function clientHandler(method, current_client){
    switch (method) {
        case 'create':
            let new_client = await pool.connect();
            if(avalaible_clients.length > 0){
                client[avalaible_clients[0]] = new_client; 
                return avalaible_clients.shift();
            }
            client.push(new_client);
            return client_id++;
        case 'release':
            client[current_client].release();
            avalaible_clients.push(current_client);
            break;
        default:
            break;
    }
}

async function readUserData(current_client){
    return (await client[current_client].query(prepared_statement.user.get)).rows;
}
async function addUserData(current_client){
    return (await client[current_client].query(prepared_statement.user.post)).rows;
}

async function updateUserData(current_client) {
    return (await client[current_client].query(prepared_statement.user.put)).rows;
}

async function deleteUserData(current_client){
    await client[current_client].query(prepared_statement.user.collateral_deletion);
    return (await client[current_client].query(prepared_statement.user.delete)).rows;
}

async function getTransfer(current_client){
    const transfer_data = (await client[current_client].query(prepared_statement.transfer.get)).rows;
    return transfer_data.map(data => {
        return [data.id, all_client_data.get(data.emisor), all_client_data.get(data.receptor), data.monto, data.fecha];
    });
}

async function newTransfer(current_client){
    try{
        await client[current_client].query('BEGIN');

        prepared_statement.transfer.post.values[0] = (await client[current_client].query(prepared_statement.transfer.issuer)).rows[0].id;
        prepared_statement.transfer.post.values[1] = (await client[current_client].query(prepared_statement.transfer.receptor)).rows[0].id;

        await client[current_client].query('COMMIT');
        return (await client[current_client].query(prepared_statement.transfer.post)).rows;
    }catch(e){
        await client[current_client].query("ROLLBACK");
        console.log("Detalle del error:", e.where);
        console.log("Codigo del error:", e.code);
        console.log("Restriccion violada en el campo:", e.constraint);
        return e;
    }
}

module.exports = dataManagement;