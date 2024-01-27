const PORT= 8002

const express= require("express")
const app=express()
const pool=require('./db')

/* app.get('/', (req,res) => {
    res.send('hellooo!')
})*/

//get all todos

app.get('/todos', async (req,res)=>{
    try{
       const todos=  await pool.query('SELECT * FROM todos')
       res.json(todos.rows)

    } catch(err){
        console.error(err)

    }
})


app.listen(PORT, ()=> console.log('Server running on PORT ' + PORT) )

