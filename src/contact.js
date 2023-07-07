const bcrypt = require('bcrypt');
const {dbConfig} = require('../database/config');
const pgp = require('pg-promise')();

const dbName = process.env.DB_NAME;
const saltRounds = 10;
const db = pgp({ ...dbConfig, database: dbName })


async function addContact( name, tel, id_pers) {
  let success = false;
  let result;

  try {
    const query = 'INSERT INTO contactsurgence(name, tel, id_pers) VALUES ($1, $2, $3)';
    result = await db.none(query, [name, tel, id_pers])
    
    console.log('Ajout du contact reussie'); // Affiche les données insérées
    success = true;
    
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
}
    return {success: success, contact: result};
}

async function deleteContact(id_contact) {
  let success = false;
  let result;

  try {
    const query = 'DELETE FROM contactsurgence WHERE id_contact = $1 RETURNING *';
    result = await db.one(query, [id_contact])
    if(result) {
      console.log('Suppression du contact reussie'); // Affiche les données insérées
      success = true;
    }else{
      console.log('Erreur lors de l\' Suppression');
    }
  } catch (error) {
    console.error('Erreur lors de l\'Suppression :', error);
}
    return {success: success, contact: result};
}


async function getContact(id_pers) {
  try {
    const query = 'SELECT * FROM contactsurgence WHERE id_pers = $1';
    return await db.any(query, [id_pers])
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}


module.exports = {addContact, deleteContact, getContact};