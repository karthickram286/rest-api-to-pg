# rest-api-to-pg
A node script which gets and stores all results from https://jsonplaceholder.typicode.com in a postgresdb instance.

## How to Run?
- clone the project
- Run `npm install` - This will download all the dependencies required
- Run `npm start` - To start the script

## Dependencies
- axios (for making http calls)
- node-postgres (to connect with remote postgresdb instance)

## Note
- Since, the table schema has primary keys, duplicate entries won't be allowed. So, to rerun the same script multiple times without having the hassle of truncating the tables manually, all the tables are truncated at the beginning. The schema design of the tables are available in schema folder.


