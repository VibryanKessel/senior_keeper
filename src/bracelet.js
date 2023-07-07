const bcrypt = require('bcrypt');
const {dbConfig} = require('../database/config');
const pgp = require('pg-promise')();

const dbName = process.env.DB_NAME;
const saltRounds = 10;
const db = pgp({ ...dbConfig, database: dbName })


async function addBracelet( id_client, date_fab, date_per, statut, date_cmd, date_liv) {
  let success = false;
  let result;

  try {
    const query = 'INSERT INTO bracelets(id_possesseur, date_fab, date_per, statut, date_cmd, date_liv) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    result = await db.one(query, [id_client,date_fab, date_per, statut, date_cmd, date_liv])
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

async function getBracelet(id) {
  try {
    const query = 'SELECT * FROM bracelets WHERE id_bracelet = $1';
    return  await db.oneOrNone(query, [id])
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

module.exports = {addBracelet, getBracelet};