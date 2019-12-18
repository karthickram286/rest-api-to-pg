"use strict";

const axios = require('axios');
const { client } = require('../connection/postgres.connection');

let executePosts = async function() {
    // Truncating the table first
    truncateposts();

    console.log('Started storing posts...');
    try {
        let postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        let postArray = postsResponse.data;
        postArray.forEach(post => {
            storePost(post.id, post.userId, post.title, post.body);
        });
    } catch (err) {
        console.log(err);
    }
}

let storePost = async function(id, userId, title, body) {
    const postQuery = 'INSERT INTO posts_karthick(id, userid, title, body) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, userId, title, body];
    try {
        await client.query(postQuery, values);
        console.log('post ' + id + ' stored');
    } catch (err) {
        console.log(err);
    }
}

let truncateposts = async function() {
    const truncateQuery = 'TRUNCATE TABLE posts_karthick';
    try {
        await client.query(truncateQuery);
        console.log('posts table truncated');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { executePosts };