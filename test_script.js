const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

if (!input) {
  console.log("Please enter something .. ");
  return;
}

client.connect((err) => {
  if (err) {
    console.error("Connection Error", err);
    return;
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0]);
    client.end();
  });
});

