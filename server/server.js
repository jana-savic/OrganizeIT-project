const PORT= 8000;

const express= require("express")
const app=express()

/* app.get('/', (req,res) => {
    res.send('hellooo!')
})*/



app.listen(PORT, ()=> console.log('Server running on PORT ' + PORT) )

