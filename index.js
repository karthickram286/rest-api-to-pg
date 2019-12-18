"use strict";

const { executePosts } = require('./resources/posts');
const { executeComments } = require('./resources/comments');
const { executeAlbums } = require('./resources/albums');
const { executePhotos } = require('./resources/photos');
const { executeTodos } = require('./resources/todos');
const { executeUsers } = require('./resources/users');

/**
 * Calling the functions which retrives the values from fake REST api and stores in Postgres
 */
executePosts();
executeComments();
executeAlbums();
executePhotos();
executeTodos();
executeUsers();

