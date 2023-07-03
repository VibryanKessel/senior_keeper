const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');
const path = require("path");

const createDatabase = require('./database');
const registerUser = require('./src/register');
const loginUser = require('./src/login');

const app = express();
const port = 3000;

// Générer une clé secrète aléatoire
const generateSecretKey = () => {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: generateSecretKey(),
  resave: false,
  saveUninitialized: false,
}));

app.use('/site',express.static(path.resolve('public')));

app.use('/login',express.static(path.resolve('public/html/login.html')));
app.use('/register',express.static(path.resolve('public/html/register.html')));


app.get('/', (req, res) => {
  if (req.session.telephone) {
    res.redirect('/site');
  } else {
    res.redirect('/login');
  }
})

// app.get('/login', (req, res) => {
//   res.sendFile(path.resolve('./public/html/login.html'));
// });

// app.get('/register', (req, res) => {
//   res.sendFile(path.resolve('./html/register.html'));
// });

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/alert', (req, res) => {
  
  res.status(200).json({"message":"Alerte bien reçue pour le bracelet : "+req.query.id})
});

app.post('/alert', (req, res) => {
  
  res.status(200).json({"message":"Alerte bien reçue pour le bracelet : "+req.query.id})
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});


app.post('/register', async (req, res) => {
  const { nom, prenom, adresse, email, telephone, motdepasse } = req.body;
  const registerResult = await registerUser(nom, prenom, adresse, email, telephone, motdepasse);
  if(registerResult.success){
    res.set('Location', 'http://localhost:3000/login')
    res.status(200).send('register successful');
  }else{
    res.status(400).send('register failed');
    console.log('register failed');
  }
});

app.post('/login', async (req, res) => {
  const { telephone, motdepasse } = req.body;
  const loginResult = await loginUser(telephone, motdepasse);
  if(loginResult.success){
    req.session.telephone = telephone;
    res.set('Location', 'http://localhost:3000/')
    res.status(200).send('Login successful');
    console.log('Login successful');
  }else{
    res.status(400).send('Login failed');
    console.log('Login failed');
  }
});

async function initializeApp() {
  await createDatabase(); // Appel de la fonction de création de la base de données
  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });
}

initializeApp();
