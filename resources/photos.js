"use strict";

const axios = require('axios');
const { client } = require('../connection/postgres.connection');

let executePhotos = async function() {
    console.log('Started storing photos...');
    try {
        let photosResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');
        let photosArray = photosResponse.data;
        photosArray.forEach(photo => {
            storePhoto(photo.id, photo.albumId, photo.title, photo.url, photo.thumbnailUrl);
        });
    } catch (err) {
        console.log(err);
    }
}

let storePhoto = async function(id, albumId, title, url, thumbnail_url) {
    const photoQuery = 'INSERT INTO photos_karthick(id, albumid, title, url, thumbnail_url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id, albumId, title, url, thumbnail_url];
    try {
        await client.query(photoQuery, values);
        console.log('photo ' + id + ' stored');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { executePhotos };