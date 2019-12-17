"use strict";

const { Client } = require('pg');

let connectionString = 'postgres://fchhltfc:vcyFNRGGWwzAIXdQPiTMXcEXz5nYAYLV@satao.db.elephantsql.com:5432/fchhltfc';

const client =new Client({
    connectionString: connectionString
});
client.connect();

module.exports = { client }

