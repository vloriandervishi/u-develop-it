const sqlite3 = require("sqlite3").verbose();
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = new sqlite3.Database("./db/schema.sql", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("connected to the election database.");
});
app.get('/api/candidates',(req,res)=>{

const sql= `SELECT *FROM candidates`;
const params=[];
db.all(sql,params, (err, rows) => {
    if(err){
        res.status(500).json({error:err.message});
    }
  res.json({
      message:'success',
      data: rows
  });
});
});
app.get('/api/candidate/:id',(req,res)=>{
   const sql= `SELECT *FROM candidates WHERE id =?`;
   const params= [req.params.id];


db.get(sql,params, (error, row) => {
  if (error) {
    res.status(400).json({error:err.message});
    return;
  }
  res.json({
      message: 'success',
      data:row
  });
});
});
db.run(`DELETE FROM candidates WHERE id=?`, 1, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result, this, this.changes);
});
//Default response for any other requests(Not Found) Catch all
//Create a candidates
const sql = `INSERT INTO CANDIDATES (id,first_name,last_name,industry_connected)VALUES(?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];
//es5 function, not arrow function, to use this
db.run(sql, params, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result, this.lastID);
});
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
