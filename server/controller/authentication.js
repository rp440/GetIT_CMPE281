//var Cryptr = require('cryptr');
//cryptr = new Cryptr('myTotalySecretKey');
var mysql = require("mysql");
// console.log(db)
const db = mysql.createConnection({
  ssl: true,
  port: 3306,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
console.log("Auth=", db)

//process.env.HOST
db.connect(function (err) {
  if (err) throw err;
  console.log("Auth Connected!");
});

module.exports.authenticate = function (req, res) {
  var uname = req.body.uname;
  var password = req.body.pass;

  db.query(
    "SELECT * FROM accounts WHERE username = ?",
    [uname],
    function (error, results, fields) {
      if (error) {
        res.json({
          status: false,
          message: "there are some error with query",
        });
      } else {
        if (results.length > 0) {
          //decryptedString = cryptr.decrypt(results[0].password);
          if (password == results[0].password) {
            res.json({
              status: true,
              message: "successfully authenticated",
            });
          } else {
            res.json({
              status: false,
              message: "Email and password does not match",
            });
          }
        } else {
          res.json({
            status: false,
            message: "Email does not exist",
          });
        }
      }
    }
  );
};
