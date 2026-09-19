import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql'
import bodyparser from 'body-parser'

dotenv.config()

const app = express()
app.use(bodyparser.json())


const conn = mysql.createConnection({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT || 3306,
    ssl: {
        minVersion: 'TLSv1.2'
    }
})


conn.connect(function(err){
    if(err) throw new Error(err)
        console.log('Database connected successfully')
})


app.get('/students',function(req,res){

    conn.query('SELECT * FROM students',(err,results)=>{
        if(err) throw new Error(err)
        res.json({message: 'Got students ',results})
    })
})


app.get('/students/:id',function(req,res){
    const id = req.params.id
    conn.query('SELECT * FROM students where id = ?',[id],(err,results)=>{
        if(err) throw new Error(err)
        res.json({message: 'Got a student ',results})
    })
})


app.post('/students',function(req,res){
    const {first_name,last_name,email,gender,date_of_birth} = req.body
    conn.query('INSERT INTO students (first_name,last_name,email,gender,date_of_birth) VALUES(?,?,?,?,?)',[first_name,last_name,email,gender,date_of_birth],(err,results)=>{
        if(err) throw new Error(err)
        res.json({message: 'Added a student',results})
    })
})



app.put('/students/:id',function(req,res){
    const id = req.params.id
    const {first_name,last_name,email,gender,date_of_birth} = req.body
    conn.query('UPDATE students SET first_name = ?, last_name = ?, email = ?, gender = ?, date_of_birth = ? WHERE id = ?',[first_name,last_name,email,gender,date_of_birth,id],(err,results)=>{
        if(err) throw new Error(err)
        res.json({message: 'Updated a student',results})
    })
})


app.delete('/students/:id',function(req,res){
    const id = req.params.id
    conn.query('DELETE FROM students WHERE id = ?',[id],(err,results)=>{
        if(err) throw new Error(err)
        res.json({message: 'Deleted a student',results})
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
})
