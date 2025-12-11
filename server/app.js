//app.js
const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const { query, pool } = require("./db"); // Assuming you have a db.js file exporting the database connection pool
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const uuid = require("uuid").v4(); // Generate a unique identifier
const fileUpload = require("express-fileupload");
const cors = require("cors");
const e = require("express");
const { verifyToken, generateToken } = require("./auth"); // Import the generateToken function from auth.js

const app = express();

const port = 3000;

app.use(cors({ origin: "http://localhost:8080", credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
  );
  next();
});

app.disable("x-powered-by");

app.get("/", verifyToken, (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await query(
    "SELECT id, username, password FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.cookie("JWT", token, { httpOnly: true, secure: false }); // Set secure: true in production with HTTPS
  res.json({ message: "Login successful" });
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const userCheck = await query("SELECT id FROM users WHERE username = $1", [
      username,
    ]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error }); //'Internal server error'
  }
});

app.get("/posts", verifyToken, async (req, res) => {
  try {
    const result = await query("SELECT id, title, content,image FROM posts");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/posts", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.files?.image; // Assuming you're using middleware like express-fileupload or multer

    let imageName = null;

    if (image) {
      const imageExtension = path.extname(image.name);
      imageName = `${uuid}${imageExtension}`;
      const imagePath = path.join(__dirname, "posts", "images", imageName);

      // Move the uploaded file to the desired directory
      await new Promise((resolve, reject) => {
        image.mv(imagePath, (err) => {
          if (err) {
            reject(new Error("Failed to upload image"));
          } else {
            resolve();
          }
        });
      });
    }

    // Store the post details in the database
    await query(
      "INSERT INTO posts (title, content, image) VALUES ($1, $2, $3)",
      [title, content, imageName]
    );

    res.json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/posts/:id", verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await query(
      "SELECT id, title, content,image FROM posts WHERE id = $1",
      [postId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/posts/:id", verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await query("DELETE FROM posts WHERE id = $1 RETURNING id", [
      postId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/posts/:id", verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const image = req.files?.image; // Assuming you're using middleware like express-fileupload or multer

    let imageName = null;

    if (image) {
      const imageExtension = path.extname(image.name);
      imageName = `${uuid}${imageExtension}`;
      const imagePath = path.join(__dirname, "posts", "images", imageName);

      // Move the uploaded file to the desired directory
      await new Promise((resolve, reject) => {
        image.mv(imagePath, (err) => {
          if (err) {
            reject(new Error("Failed to upload image"));
          } else {
            resolve();
          }
        });
      });
    }

    // Build the dynamic query based on provided fields
    const fields = [];
    const values = [];
    let queryIndex = 1;

    if (title) {
      fields.push(`title = $${queryIndex++}`);
      values.push(title);
    }
    if (content) {
      fields.push(`content = $${queryIndex++}`);
      values.push(content);
    }
    if (imageName) {
      fields.push(`image = $${queryIndex++}`);
      values.push(imageName);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    values.push(postId);
    const queryText = `UPDATE posts SET ${fields.join(
      ", "
    )} WHERE id = $${queryIndex} RETURNING id`;

    const result = await query(queryText, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/posts/images/:imageName", verifyToken, (req, res) => {
  const imageName = req.params.imageName;
  //console.log("Requested image:", imageName);
  const imagePath = path.join(__dirname, "posts", "images", imageName);
  res.sendFile(imagePath);
});

module.exports = app;
