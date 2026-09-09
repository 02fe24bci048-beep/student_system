import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql'
import bodyparser from 'body-parser'

dotenv.config()

const app = express()

// Middleware
app.use(bodyparser.json())

// MySQL database connection
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
})

// Connect to MySQL
conn.connect(function (err) {
    if (err) {
        console.error('Database connection failed:', err.message)
        return
    }

    console.log('Database connected successfully')
})


// ===============================
// GET ALL STUDENTS
// ===============================
app.get('/students', function (req, res) {

    conn.query('SELECT * FROM students', function (err, results) {

        if (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Database error',
                error: err.message
            })
        }

        res.json({
            message: 'Got students',
            results: results
        })
    })
})


// ===============================
// GET STUDENT BY ID
// ===============================
app.get('/students/:id', function (req, res) {

    const id = req.params.id

    conn.query(
        'SELECT * FROM students WHERE id = ?',
        [id],
        function (err, results) {

            if (err) {
                console.error(err)
                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                })
            }

            res.json({
                message: 'Got a student',
                results: results
            })
        }
    )
})


// ===============================
// ADD NEW STUDENT
// ===============================
app.post('/students', function (req, res) {

    const {
        first_name,
        last_name,
        email,
        gender,
        date_of_birth
    } = req.body

    const sql = `
        INSERT INTO students
        (first_name, last_name, email, gender, date_of_birth)
        VALUES (?, ?, ?, ?, ?)
    `

    conn.query(
        sql,
        [
            first_name,
            last_name,
            email,
            gender,
            date_of_birth
        ],
        function (err, results) {

            if (err) {
                console.error(err)
                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                })
            }

            res.json({
                message: 'Added a student',
                results: results
            })
        }
    )
})


// ===============================
// UPDATE STUDENT
// ===============================
app.put('/students/:id', function (req, res) {

    const id = req.params.id

    const {
        first_name,
        last_name,
        email,
        gender,
        date_of_birth
    } = req.body

    const sql = `
        UPDATE students
        SET
            first_name = ?,
            last_name = ?,
            email = ?,
            gender = ?,
            date_of_birth = ?
        WHERE id = ?
    `

    conn.query(
        sql,
        [
            first_name,
            last_name,
            email,
            gender,
            date_of_birth,
            id
        ],
        function (err, results) {

            if (err) {
                console.error(err)
                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                })
            }

            res.json({
                message: 'Updated a student',
                results: results
            })
        }
    )
})


// ===============================
// DELETE STUDENT
// ===============================
app.delete('/students/:id', function (req, res) {

    const id = req.params.id

    conn.query(
        'DELETE FROM students WHERE id = ?',
        [id],
        function (err, results) {

            if (err) {
                console.error(err)
                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                })
            }

            res.json({
                message: 'Deleted a student',
                results: results
            })
        }
    )
})


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Server is running on port ${PORT}`)
})
