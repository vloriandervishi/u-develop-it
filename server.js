const express = require("express");

const sqlite3 = require("sqlite3").verbose();

const inputCheck= require("./utils/inputCheck");
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
app.delete(`/api/candidate/:id`,(req,res)=>{
    const sql= `DELETE FROM candidates WHERE id=?`;
    const params=[req.params.id];

db.run(sql, params, function (err, result) {
  if (err) {
     res.status(400).json({error: err.message});
     return;
  }
  res.json({
      message: 'successfully deleted',
      changes:this.changes
  });
});
});
app.post('/api/candidate',({body},res)=>{
const errors = inputCheck(body,'first_name', 'last_name', 'industry_connected');
if(errors){
    res.status(400).json({error: err.errors});
    return;
}
const sql=`INSERT INTO candidates(first_name,last_name,industry_connected)VALUES (?,?,?,?)`;
const params=[body.first_name,body.last_name,body.industry_connected];
//es5 function, not arrow, function , to use  'this'
db.run(sql,params,function(err,resut){
 if(err){
     res.status(400).json({error:err.message});
     return;
 }
 res.json({
     message: 'success',
     data: body,
     id: this.lastID
 })
});
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
