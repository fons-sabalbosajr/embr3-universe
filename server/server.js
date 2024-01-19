import express from "express";
import sql from "mssql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const salt = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const dbConfig = {
  user: "erms-server",
  password: "EMBR3erms20212",
  server: "10.14.77.248",
  database: "db_universe",
  options: {
    encrypt: false, // Use this if you're on Windows Azure
  },
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

poolConnect
  .then(() => {
    console.log("Connected to SQL Server");
  })
  .catch((err) => {
    console.error("Error connecting to SQL Server:", err);
  });

/* FOR AUTHENTICATION OF ACCOUNT */
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not logged in" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not in the correct condition" });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
});

app.get('/logout', (req, res)=> {
    res.clearCookie('token');
    return res.json({Status: "Logout Success"});
})


/* FOR REGISTRATION AND SIGN UP ACCOUNT */
app.post("/register", (req, res) => {
  const sqlQuery =
    "INSERT INTO tb_login([name], [email], [password]) VALUES (@name, @email, @password)";

  // Trim input data
  const trimmedName = req.body.name.trim();
  const trimmedEmail = req.body.email.trim();

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });

    const request = pool.request();
    request.input("name", sql.VarChar, trimmedName);
    request.input("email", sql.VarChar, trimmedEmail);
    request.input("password", sql.VarChar, hash);

    request.query(sqlQuery, (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        console.error("Stack Trace:", err.stack);
        return res.json({ Error: "Error executing query" });
      }
      return res.json({ Status: "Success" });
    });
  });
});

/* FOR LOGGING IN */
app.post("/login", (req, res) => {
  const sqlQuery = "SELECT * FROM tb_login WHERE email = @email";
  const request = pool.request();
  request.input("email", sql.VarChar, req.body.email);

  request.query(sqlQuery, (err, data) => {
    if (err) {
      console.error("Login error in server:", err.message);
      console.error("Stack Trace:", err.stack);
      return res.json({ Error: "Login error in server" });
    }

    try {
      if (data && data.recordset && data.recordset.length > 0) {
        const storedPasswordHash = data.recordset[0].password;

        if (typeof storedPasswordHash !== "string") {
          console.error("Invalid password hash format:", storedPasswordHash);
          return res.json({ Error: "Invalid password hash format" });
        }

        const passwordMatch = bcrypt.compareSync(
          req.body.password.toString().trim(),
          storedPasswordHash
        );

        if (passwordMatch) {
          const name = data.recordset[0].name; // Corrected from data[0].name
          const token = jwt.sign({ name }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token, { httpOnly: true });
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: "Invalid credentials" });
        }
      } else {
        return res.json({ Error: "No email existed" });
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      console.error("Stack Trace:", error.stack);
      return res.json({ Error: "An unexpected error occurred during login" });
    }
  });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
