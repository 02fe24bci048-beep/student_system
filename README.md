                                    ------------------------Project Title------------------------
  STUDENT MANAGEMENT SYSTEM

                                    --------------------Group Members Names----------------------
  - GANZA ERIC
  - CYIZA KENEDY
  - SHEMA SHANI
  - HABIMANA HUSSENI
  - KEZA UWAMWIZA FARHNAH
  
                                   ---------------------Project Description------------------------
  A Node.js and Express REST API for managing student records, featuring a MYSQL database and full CRUD(Create,Read,Update,Delete).

                                   -------------------------Technologies Used------------------------
  - Node.js & Express.js – Backend runtime
  - MySQL – Database
  - dotenv – Environment variables
  - Postman / Thunder Client – API testing
  - Key Dependencies: `mysql` , `dotenv` , `body-parser` , `nodemon`

                                 ---------------------------Database Setup steps----------------------
   1. Start MySQL server (XAMPP or MySQL Server)
   2. Create a database named `student_system`
   3. Run the following SQL query to create the table:

      



            USE student_system;
            CREATE TABLE students (
      
             id INT AUTO_INCREMENT PRIMARY KEY,
             first_name VARCHAR(100) NOT NULL,
      
             last_name VARCHAR(100) NOT NULL,
             email VARCHAR(150) UNIQUE,
      
             gender VARCHAR(10),
             date_of_birth DATE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );


                                  ---------------------------API endpoint list---------------------
         GET     /students
             → Retrieve all students

        GET     /students/:id
             → Retrieve a single student by ID

        POST    /students
             → Add a new student

        PUT     /students/:id
             → Update an existing student

       DELETE  /students/:id
             → Delete a student from the database

                                 -----------------------How to run the project locally------------------
      
     / 
       1. Clone the repository
              - Open your terminal and run:
                  - git clone https://github.com/kenedy12a/student_system.git
       2. Navigate to the project folder
              - cd student-system
       3. Install dependencies
              - Make sure you have Node.js installed, then run:
                   -npm install
       4.Set up the database
              - Start your MySQL server (e.g., via XAMPP or MySQL Workbench)
              - Create the database and tables by importing the .sql file you prepared using phpMyAdmin.
       5.Start the server
              -type this command in termin
                 -node index.js
              -or if you have nodemon installed type:
                 -nodemon index
       6.Access the API
              - Open your browser or API testing tool (Postman/THUNDER CLIENT) and navigate to:
                 -http://localhost:3000/students
          
