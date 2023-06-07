const bcrypt = require('bcrypt');
const {dbConfig} = require('../database/config');
const pgp = require('pg-promise')();

const dbName = process.env.DB_NAME;
const saltRounds = 10;
const db = pgp({ ...dbConfig, database: dbName })


async function registerUser(nom, prenom, adresse, email, telephone, motdepasse) {
  let success = false;
  try {
    const hashedPassword = await bcrypt.hash(motdepasse, saltRounds);
    const query = 'INSERT INTO Personnes (nom, prenom, adresse, email, telephone, motdepasse) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await db.one(query, [nom, prenom, adresse, email, telephone, hashedPassword])
    if(result) {
      console.log('Insertion reussie'); // Affiche les données insérées
      success = true;
    }else{
      console.log('Erreur lors de l\'insertion');
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
  }
  return {success: success};
}

module.exports = registerUser;