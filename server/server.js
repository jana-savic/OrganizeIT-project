const PORT = 8002

const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* app.get('/', (req,res) => {
    res.send('hellooo!')
})*/

app.use(cors())
app.use(express.json())

//get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)

    } catch (err) {
        console.error(err)

    }
})

//get user - rola
app.get('/users/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [userEmail])
        res.json(user.rows)

    } catch (err) {
        console.error(err)

    }
})

// get all users from db
app.get( '/users' , async (req, res) => {
    const { userRole } = req.params
    try {
        const allUsers = await pool.query('SELECT * FROM users WHERE role =$1', ['USER'])
        res.json(allUsers.rows)
        

    } catch (err) {
        console.error(err)

    }
})

//create a new to-do
app.post('/todos', async (req, res) => {

    const { user_email, title, progress, date } = req.body
    console.log(user_email, title, progress, date)
    const id = uuidv4()
    try {
        const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`, [id, user_email, title, progress, date])
        res.json(newToDo)
    } catch (err) {
        console.error(err)
    }
})

//edit todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const { user_email, title, progress, date } = req.body
    try {
 await pool.query('UPDATE todos SET user_email =$1, title =$2, progress =$3, date =$4 WHERE id = $5;', [user_email, title, progress, date, id])
       
 const editToDo = await pool.query('SELECT * FROM todos WHERE id=$1' , [id])

 res.json(editToDo.rows[0])
    } catch (err) {
        console.error(err)
    }
})

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
        res.json(deleteToDo)
    } catch (err) {
        console.error(err)
    }
})

//signup post jer upisujemo 
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    //hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        //dodata rola - svi koji se sign-upuju su useri po defaultu
        const signUp = await pool.query(`INSERT INTO users (email,hashed_password, role) VALUES ($1,$2, 'USER')`, [email, hashedPassword])
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
        //kada se registruje, po defaultu je user tako da saljemo kao string
        res.json({ email, token, role: 'USER'}) 

    } catch (err) {
        console.error(err)
        if (err) {
            res.json({ detail: err.detail })
        }
    }
})

//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const users = await pool.query('SELECT * FROM users WHERE email=$1', [email])

        if (!users.rows.length) return res.json({ detail: 'User does not exist!' })

        //uporedjujemo uneti pass sa pass-om iz baze koji je hashovan
        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
        if (success) {
            //ako se sifre poklapaju, vraca nam tog usera 
            res.json({ 'email': users.rows[0].email, token, 'role': users.rows[0].role })
        } else {
            res.json({ detail: 'Login failed' })
        }
    } catch (err) {
        console.error(err)
    }
})

//Change password
app.post('/users/:email', async (req, res) => {
    const email= req.params.email;
    const { newPassword } = req.body;
  
    try {
      // Check if the token is valid
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (!user.rows.length) {
        return res.status(400).json({ error: 'Invalid email' });
      }
      console.log(newPassword + "1. put");
      // Update the user's password and clear the reset token
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
  
      await pool.query('UPDATE users SET hashed_password = $1 WHERE email= $2', [hashedPassword, email]);
  
      console.log(newPassword);
      return res.json({ message: 'Password reset successfully' });

    } catch (error) {
      console.error('Error completing password reset:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(PORT, () => console.log('Server running on PORT ' + PORT))

