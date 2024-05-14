require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getClient } = require("./get-client");
const auth = require("./middleware/auth");

const PORT = process.env.PORT || 5004;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/login", async (req, res) => {
  const client = await getClient();

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All inputs are required");
    }

    const userExists = await checkUserExists(client, email);
    if (!userExists) {
      return res.status(400).send("Invalid Credentials");
    }

    const { rows: users } = await client.query("SELECT * FROM users");
    const user = users.find((u) => u.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }
  } catch (error) {
    console.log("Login error ", error);
  } finally {
    await client.end();
  }
});

app.post("/register", async (req, res) => {
  const client = await getClient();

  try {
    const { name, password, email } = req.body;

    const tableExists = await checkTableExists(client);
    if (tableExists) {
      const userExists = await checkUserExists(client, email);
      if (userExists) {
        return res.status(409).send("User Already Exist. Please Login");
      }
    }
    const encryptedUserPassword = await bcrypt.hash(password, 10);

    const createUUIDQuery = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.query(createUUIDQuery);

    let createTableQuery = `
  CREATE TABLE IF NOT EXISTS users(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email text NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT current_timestamp
  )
`;

    await client.query(createTableQuery);

    const text =
      "INSERT INTO users (name, password, email) VALUES ($1, $2, $3);";
    const values = [name, `${encryptedUserPassword}`, email];

    await client.query(text, values);

    const table = await client.query("SELECT * FROM users");
    const newUser = table.rows.at(-1);

    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    newUser.token = token;

    res.status(200).send("User registered successfully");
  } catch (error) {
    console.log("Error in POST /register action", error);
  } finally {
    await client.end();
  }
});

app.post("/success", auth, (req, res) => {
  res.status(200).send("Authentication success");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

async function checkTableExists(client) {
  const tableExistsQuery = `
    SELECT EXISTS (
      SELECT 1 
      FROM information_schema.tables 
      WHERE table_schema = 'public'  
      AND table_name = 'users'
    );
  `;
  const res = await client.query(tableExistsQuery);
  return res.rows[0].exists;
}

async function checkUserExists(client, email) {
  const userExistsQuery = `
    SELECT EXISTS (
      SELECT 1 
      FROM users
      WHERE email = $1
    );
  `;
  const res = await client.query(userExistsQuery, [email]);
  return res.rows[0].exists;
}
