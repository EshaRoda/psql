const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const input = process.argv.slice(2);
if (input.length !== 3) {
  console.log("Usage: add_person.js <firstname> <lastname> <birthdate>");
  return;
}

knex('famous_people')
  .insert({first_name:input[0],last_name:input[1],birthdate:input[2]})
  .then(function() {
    console.log("Added new person");
  });

knex.destroy();