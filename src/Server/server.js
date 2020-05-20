const express = require("express");
const cors = require("cors");
const pool = require("pg").Pool;
const app = express();
const path = require("path");
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const connect = new pool({
    user : "oxbfeyidmpgzcp",
    password : "816e0441af0e4be6b405d518ec53e0f1ead72955f24c7e44795c091cf5e71c02",
    host : "ec2-34-195-169-25.compute-1.amazonaws.com",
    port : 5432,
    database : "d5g5g39cittq6e"
});


app.post("/",async (req,res)=>{
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

app.get("/:user",async (req,res)=>{
    try{
        const id = req.params.user;
        const todoList = await connect.query(
            "SELECT task FROM todolist WHERE id = $1",[id]
        );
        res.send(todoList.rows)
    }catch(err){
        console.log(err);
    }
})

app.delete("/:user",async (req,res)=>{
    try{
        const [id,item] = req.params.user.split(",");
        const updated = await connect.query(
            "DELETE from todolist where id = $1 and task = $2",[id,item]
        );
        res.json("deleted")
        //console.log("deleted")
    }catch(err){
        console.log(err)
    }
})



app.listen(port,()=>{
    console.log(`server running at ${port}`);
})