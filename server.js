require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  });

const corsOptions = {
  origin: 'https://blurit.onrender.com', // Adjust the origin as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/signin', (req, res) => {
    res.send("successful porting");
})

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => { image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

app.listen(process.env.DB_PORT);