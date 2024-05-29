import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import path from "path";
import { fileURLToPath } from 'url';


const app = express();
const port = 3000;

// Connecting the postgres-db
const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"zcoder",
  password:"10472938",
  port:5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'LandingPage.html'));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});


app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM zcoder WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      // res.send("Email already exists. Try logging in.");
      // alert("Email already exists. Try logging in.");
      const script = `<script>alert("Email already exists. Try logging in.");
          window.location.href = "/login"; // Redirect to login page </script>`;
      return res.send(script);
    } else {
      const result = await db.query(
        "INSERT INTO zcoder (email, password) VALUES ($1, $2)",
        [email, password]
      );
      console.log(result);
      res.sendFile(path.join(__dirname, 'public', 'Login.html')); // Update this line
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/login", async (req, res) => {

  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM zcoder WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.sendFile(path.join(__dirname, 'public', 'bookmark.html'));
      } else {
        const script= '<script>alert("Incorrect Pasword");window.location.href = "/login";</script>';
        res.send(script);
        // alert("Incorrect Password");
      }
    } else {
        const script= '<script>alert("Username does not exist.");window.location.href = "/login";</script>';
        res.send(script);
      // alert("User not found");
    }
  } catch (err) {
    console.log(err);
  }


});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


