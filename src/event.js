const bcrypt = require('bcrypt');
const {dbConfig} = require('../database/config');
const pgp = require('pg-promise')();

const dbName = process.env.DB_NAME;
const saltRounds = 10;
const db = pgp({ ...dbConfig, database: dbName })


async function getEvent(id_pers) {
    try {
      const query = 'SELECT * FROM evenements WHERE id_pers = $1';
      return  await db.any(query, [id_pers])
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }

module.exports = getEvent;
