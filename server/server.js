const PORT= 8002

const express= require("express")
const cors = require('cors')
const app=express()
const pool=require('./db')

/* app.get('/', (req,res) => {
    res.send('hellooo!')
})*/

app.use(cors())
//get all todos

app.get('/todos/:userEmail', async (req,res)=>{
    const { userEmail } = req.params
    try{
       const todos=  await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
       res.json(todos.rows)

    } catch(err){
        console.error(err)

    }
})


app.listen(PORT, ()=> console.log('Server running on PORT ' + PORT) )

