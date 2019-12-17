"use strict";

const axios = require('axios');
const { client } = require('../connection/postgres.connection');

let executeUsers = async function() {
    console.log('Started storing users...');
    try {
        let usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        let usersArray = usersResponse.data;
        usersArray.forEach(user => {
            storeUser(user.id, user.name, user.username, user.email, user.address, user.phone, user.website, user.company);
        });
    } catch (err) {
        console.log(err);
    }
}

let storeUser = async function(id, name, userName, email, address, phone, website, company) {
    storeAddress(id, address.street, address.suite, address.city, address.zipcode, address.geo);
    storeCompany(id, company.name, company.catchPhrase, company.bs);
    const userQuery = 'INSERT INTO users_karthick(id, name, username, email, addressid, phone, website, companyid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [id, name, userName, email, id, phone, website, id];
    try {
        await client.query(userQuery, values);
        console.log('user ' + id + ' stored');
    } catch (err) {
        console.log(err);
    }
}

let storeAddress = async function(id, street, suite, city, zipcode, geo) {
    storeGeo(id, geo.lat, geo.lng);
    const addressQuery = 'INSERT INTO users_address_karthick(id, street, suite, city, zipcode, geoid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [id, street, suite, city, zipcode, id]; 
    try {
        await client.query(addressQuery, values);
    } catch (err) {
        console.log(err);
    }
}

let storeGeo = async function(id, lat, lng) {
    const geoQuery = 'INSERT INTO users_address_geo_karthick(id, lat, lng) VALUES ($1, $2, $3) RETURNING *';
    const values = [id, lat, lng];
    try {
        await client.query(geoQuery, values);
    } catch (err) {
        console.log(err);
    }
}

let storeCompany = async function(id, name, catchPhrase, bs) {
    const companyQuery = 'INSERT INTO users_company_karthick(id, name, catchphrase, bs) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, name, catchPhrase, bs];
    try {
        await client.query(companyQuery, values);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { executeUsers };