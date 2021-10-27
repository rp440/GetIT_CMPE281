var mysql = require("mysql");

const db = mysql.createConnection({
  host: "fliesbuk.czwcgzfba7cl.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "123456781",
  database: "sys",
  ssl: true,
  port: 3306,
});
console.log(db)

// process.env.HOST
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports.register = function (req, res) {
  var user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.uname,
    password: req.body.pass,
  };
  console.log(user);
  db.query(
    "INSERT INTO accounts (firstName, lastName, username, password) VALUES (?,?,?,?)",
    [user.firstName, user.lastName, user.username, user.password],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: true,
          data: results,
          message: "user registered sucessfully",
        });
      }
    }
  );
};
