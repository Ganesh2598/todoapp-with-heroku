const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("pg").Pool;

const path = require("path");
if (process.env.NODE_ENV === 'production') { 
    app.use(express.static(path.join(__dirname,"Client/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"Client/build/index.html"));
    })
 }
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const dev = "postgresql://postgres:kratos@localhost:5432/todolist";
const prod = process.env.DATABASE_URL;

const connect = new pool({
    connectionString:
    process.env.NODE_ENV=="production" ? prod : dev
});


app.post("/todos/",async (req,res)=>{
    try{
        const id = req.body.id;
        const task = req.body.task;
        const listOfTask = await connect.query(
            "INSERT INTO todolist (id,task) VALUES ($1,$2) RETURNING *",[id,task]
        );
        res.send(listOfTask.rows[0])
        //console.log(req.body)
    }catch(err){
        console.log(err);
    }
})

app.get("/todos/:user",async (req,res)=>{
    try{
        const id = req.params.user;
        const todoList = await connect.query(
            "SELECT task FROM todolist WHERE id = $1",[id]
        );
        res.send(todoList.rows)
        console.log(todoList.rows)
    }catch(err){
        console.log(err);
    }
})

app.delete("/todos/:user",async (req,res)=>{
    try{
        const [id,item] = req.params.user.split(",");
        const updated = await connect.query(
            "DELETE from todolist where id = $1 and task = $2",[id,item]
        );
        res.send("deleted")
        //console.log("deleted")
    }catch(err){
        console.log(err)
    }
})



app.listen(port,()=>{
    console.log(`server running at ${port}`);
})