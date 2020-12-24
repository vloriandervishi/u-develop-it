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
db.all(`SELECT *FROM candidates`,(err,rows)=>{
     console.log(rows);
});
db.get(`SELECT *FROM candidates WHERE id =1`, (error,row)=>{
    if(error){
        console.log(error);
    }
    console.log(row);
});
db.run(`DELETE FROM candidates WHERE id=?`,1,function(err,result){
 if(err){
     console.log(err);
 }
 console.log(result,this,this.changes);
});
Default response for any other requests(Not Found) Catch all
Create a candidates
const sql= `INSERT INTO CANDIDATES (id,first_name,last_name,industry_connected)VALUES(?,?,?,?)`;
const params= [1,'Ronald','Firbank',1];
//es5 function, not arrow function, to use this 
db.run(sql,params,function(err,result){
  if(err){
      console.log(err)
  }
  console.log(result,this.lastID);
});
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
