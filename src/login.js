const bcrypt = require('bcrypt');
const {dbConfig} = require('../database/config');
const pgp = require('pg-promise')();
const dbName = process.env.DB_NAME;

const db = pgp({ ...dbConfig, database: dbName })

async function loginUser(tel, password) {
  let success = false;
  
  try {
    const query = 'SELECT motdepasse FROM Personnes WHERE telephone = $1';
    const result = await db.oneOrNone(query, tel);
    
    if (result) {
      const isPasswordValid = await bcrypt.compare(password, result.motdepasse);
      if (isPasswordValid) {
        success = true;
      } else {
        console.log('Incorrect password');
      }
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
  }
  
  return {success: success};
}

module.exports = loginUser;