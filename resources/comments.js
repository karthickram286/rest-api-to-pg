"use strict";

const axios = require('axios');
const { client } = require('../connection/postgres.connection');

let executeComments = async function() {
    console.log('Started storing comments...');
    try {
        let commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
        let commentsArray = commentsResponse.data;
        commentsArray.forEach(comment => {
            storeComment(comment.id, comment.postId, comment.name, comment.email, comment.body);
        });
    } catch (err) {
        console.log(err);
    }
}

let storeComment = async function(id, postId, name, email, body) {
    const commentQuery = 'INSERT INTO comments_karthick(id, postid, name, email, body) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id, postId, name, email, body];
    try {
        await client.query(commentQuery, values);
        console.log('comment ' + id + ' stored');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { executeComments };