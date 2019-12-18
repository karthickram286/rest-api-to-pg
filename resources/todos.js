"use strict";

const axios = require('axios');
const { client } = require('../connection/postgres.connection');

let executeTodos = async function() {
    // Truncating the table first
    truncatetodos();
    console.log('Started storing todos...');
    try {
        let todosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');
        let todosArray = todosResponse.data;
        todosArray.forEach(todo => {
            storeTodo(todo.id, todo.userId, todo.title, todo.completed);
        });
    } catch (err) {
        console.log(err);
    }
}

let storeTodo = async function(id, userId, title, completed) {
    const todoQuery = 'INSERT INTO todos_karthick(id, userid, title, completed) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, userId, title, completed];
    try {
        await client.query(todoQuery, values);
        console.log('todo ' + id + ' stored');
    } catch (err) {
        console.log(err);
    }
}

let truncatetodos = async function() {
    const truncateQuery = 'TRUNCATE TABLE todos_karthick';
    try {
        await client.query(truncateQuery);
        console.log('todos table truncated');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { executeTodos };