import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql2.createConnection({
    host: "10.14.77.248",
    user: "erms",
    password: "ermsdb%2024",
    database: 'sign_up',

    authSwitchHandler: (data, cb) => {
        if (data.pluginName === 'caching_sha2_password') {
            // Use 'mysql_native_password' for authentication
            return cb(null, Buffer.from([0x01]));
        }
        return cb(new Error(`Unsupported authentication plugin: ${data.pluginName}`));
    },
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO tb_login(`name`, `email`, `password`) VALUES (?, ?, ?)";
    
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });

        const values = [
            req.body.name,
            req.body.email,
            hash  // Use the hashed password here
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.json({ Error: "Inserting data error in server" });
            }
        
            return res.json({ Status: "Success" });
        });
        
    });
});


app.listen(8081, () => {
    console.log("Server running on port 8081");
})
