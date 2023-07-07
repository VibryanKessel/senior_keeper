const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const session = require('express-session');
const path = require("path");
const createDatabase = require('./database');
const registerUser = require('./src/register');
const loginUser = require('./src/login');
const axios = require("axios");
const {addBracelet, getBracelet} = require('./src/bracelet');
const {addContact, deleteContact, getContact} = require('./src/contact');
const getEvent = require('./src/event');

/* import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import session from 'express-session';
import path from 'path';
import fetch from "node-fetch"

import createDatabase from './database';
import registerUser from './src/register';
import loginUser from './src/login';
import axios from 'axios';
 */

const sessions = {}

const app = express();
const port = 3000;

// Générer une clé secrète aléatoire
const generateSecretKey = () => {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
};

/* const accountSid = 'AC39f73d3452ca8b401929668fdb996099';
const authToken = 'a64bdf29f5bd262e533c6c5a75086d55';

const twillioClient = require('twilio')(accountSid, authToken); */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: generateSecretKey(),
  resave: false,
  saveUninitialized: false,
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use('/site', express.static(path.resolve('public')));

app.use('/login', express.static(path.resolve('public/html/login.html')));
app.use('/register', express.static(path.resolve('public/html/register.html')));


app.get('/', (req, res) => {
  if (sessions[req.sessionID]) {
    res.redirect('/site');
  } else {
    res.redirect('/login');
  }
})



app.get('/espaceUtilisateur', (req, res) => {
  if (sessions[req.sessionID] != null) {
    res.status(200).redirect("/site/html/espaceUtilisateur.html");
  } else {
    res.redirect('/login');
  }
})
// app.get('/login', (req, res) => {e
//   res.sendFile(path.resolve('./public/html/login.html'));
// });

// app.get('/register', (req, res) => {
//   res.sendFile(path.resolve('./html/register.html'));
// });

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});


app.post('/alert', (req, res) => {
  console.log("Alerte bracelet : ", req.body.id)

  const accountSid = 'AC39f73d3452ca8b401929668fdb996099';
  const authToken = 'a64bdf29f5bd262e533c6c5a75086d55';
  const client = require('twilio')(accountSid, authToken);

  const message = "Une alerte à etait détecte chez le patient portant un bracelet Senior Keepers";
  client.messages
    .create({
      body: message,
      from: '+15734923612',
      to: '+33662095641'
    })
    .then(message => { 
      res.status(200).json({message:"Alerte bien envoyée"});
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({message:"Problème lors de l'envoi de l'alerte"})
    })
});


app.post('/register', async (req, res) => {
  const { nom, prenom, adresse, email, telephone, motdepasse } = req.body;
  const registerResult = await registerUser(nom, prenom, adresse, email, telephone, motdepasse);
  if (registerResult.success) {
    res.set('Location', 'http://localhost:3000/login')
    res.status(200).json({response :'register successful'});
  } else {
    res.status(400).json({response :'register failed'});
    console.log('register failed');
  }
});

app.post('/login', async (req, res) => {
  const { telephone, motdepasse } = req.body;
  const loginResult = await loginUser(telephone, motdepasse);
  if (loginResult.success) {
    req.session.user = loginResult.user;
    sessions[req.sessionID] = req.session.user
    res.set('Location', 'http://localhost:3000/site')
    res.status(200).json({response :'Login successful'});
  } else {
    res.status(400).json({response :'Login failed'});
    console.log('Login failed');
  }
});

app.post('/cmdBracelet', async(req,res)=>{
  const { id_client, date_fab, date_per, date_cmd, statut, date_liv } = req.body;
  const cmdResult = await addBracelet(id_client, date_fab, date_per, statut, date_cmd, date_liv);
  if (cmdResult.success) {
    res.status(200).json({response :'order successful'});
  } else {
    res.status(400).json({response :'order failed'});
    console.log('order failed');
  }
})

app.post('/addContact', async(req,res)=>{
  const { name, tel, id_pers } = req.body;
  const cmdResult = await addContact(name, tel, id_pers);
  if (cmdResult.success) {
    res.status(200).json({response :'insertion successful'});
  } else {
    res.status(400).json({response :'insertion failed'});
    console.log('insertion failed');
  }
})

app.post('/deleteContact', async(req,res)=>{
  const { id_contact } = req.body;
  const cmdResult = await deleteContact(id_contact);
  if (cmdResult.success) {
    res.status(200).json({response :'Delete successful'});
  } else {
    res.status(400).json({response :'Delete failed'});
    console.log('Delete failed');
  }
})

app.post('/getContact', async(req,res)=>{
  const { id_contact } = req.body;
  const result = await getContact(id_contact);
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(400).json({message: 'Something went wrong'});
  }
})

app.post('/getBracelet', async(req,res)=>{
  const { id_bracelet } = req.body;
  const result = await getBracelet(id_bracelet);
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(400).json({message: 'Something went wrong'});
  }
})

app.post('/getEvent', async(req,res)=>{
  const { id_event } = req.body;
  const result = await getEvent(id_event);
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(400).json({message: 'Something went wrong'});
  }
})

async function initializeApp() {
  await createDatabase(); // Appel de la fonction de création de la base de données
  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });
}

initializeApp();
