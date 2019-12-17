"use strict";

const axios = require('axios');
const { client } = require('../connection/postgres.connection');

let executeAlbums = async function() {
    console.log('Started storing albums...');
    try {
        let albumsResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
        let albumsArray = albumsResponse.data;
        albumsArray.forEach(album => {
            storeAlbum(album.id, album.userId, album.title);
        });
    } catch (err) {
        console.log(err);
    }
}

let storeAlbum = async function(id, userId, title) {
    const albumQuery = 'INSERT INTO albums_karthick(id, userid, title) VALUES ($1, $2, $3) RETURNING *';
    const values = [id, userId, title];
    try {
        await client.query(albumQuery, values);
        console.log('album ' + id + ' stored');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { executeAlbums };