const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const pgclient = new Client({
    user: `${process.env.pgUser}`,
    host: `${process.env.pghost}`,
    database: `${process.env.pgDatabase}`,
    password: `${process.env.pgPassword}`,
    port: `${process.env.pgPort}`
})

pgclient.connect();

const executeQuery = (query) => {
    pgClient.query(query).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err)
    }).finally(() => {
        pgclient.end()
    })
}

module.exports = {
    executeQuery
}