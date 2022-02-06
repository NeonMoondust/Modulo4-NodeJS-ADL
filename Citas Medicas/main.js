const axios = require("axios");
const moment = require("moment");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const chalk = require("chalk");

// moment.locale("es");
const app = express();
const users_to_consult = 7;

app.get("/", async (require, response) => {
    const API_data = await axios.get(`https://randomuser.me/api/?results=${users_to_consult}`)
                                .then(data => data.data.results)
                                .catch(e => {console.log(e);});
    // console.log(API_data);
    _.forEach(API_data, (element, index) => {response.write(serverResponding(element, index), 'utf-8');});
    response.end();
});

app.listen(3000,  () =>
    console.log("Listening port: 3000...")
);

function serverResponding(API_data, index){
    const user_id = uuidv4().substring(0, 6);
    const registered_date = moment(API_data.registered.date).format('MMMM Do YYYY, h:mm:ss a');

    const toShow = `${index + 1}. Nombre: ${API_data.name.first} - Apellido: ${API_data.name.last} - ID: ${user_id} - Timestamp: ${registered_date}`;
    
    console.log(chalk.blue.bgWhite(toShow));
    return (toShow + '\n');
}