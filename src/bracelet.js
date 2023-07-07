const bcrypt = require('bcrypt');
const {dbConfig} = require('../database/config');
const pgp = require('pg-promise')();

const dbName = process.env.DB_NAME;
const saltRounds = 10;
const db = pgp({ ...dbConfig, database: dbName })


async function addBracelet( id_client, nomBracelet) {
  let success = false;
  let result;

  try {
    const query = 'INSERT INTO bracelets(id_possesseur, "nomBracelet") VALUES ($1, $2) RETURNING *';
    result = await db.one(query, [id_client, nomBracelet])
    if(result) {
      console.log('Commande reussie'); // Affiche les données insérées
      success = true;
    }else{
      console.log('Erreur lors de la commande');
    }
  } catch (error) {
    console.error('Erreur lors de la commande :', error);
}
    return {success: success, bracelet: result};
}

async function getBracelet(id_pers) {
  try {
    const query = 'SELECT * FROM bracelets WHERE id_possesseur = $1';
    return  await db.any(query, [id_pers])
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

module.exports = {addBracelet, getBracelet};