const dbConfig = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'zxb325804',
    database: 'node_demo',
    charset: 'utf8'
  }
};
let knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);  