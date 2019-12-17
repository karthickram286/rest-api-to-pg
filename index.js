"use strict"

const { client } = require('./connection/postgres.connection');

const { executePosts } = require('./resources/posts');
const { executeComments } = require('./resources/comments');
const { executeAlbums } = require('./resources/albums');
const { executePhotos } = require('./resources/photos');
const { executeTodos } = require('./resources/todos');
const { executeUsers } = require('./resources/users');

executePosts();
executeComments();
executeAlbums();
executePhotos();
executeTodos();
executeUsers();

