const pgp = require('pg-promise')();

const {dbConfig, db} = require('./config');

async function createDatabase() {
  const dbName = process.env.DB_NAME;
  
  try {
    const dbExistsQuery = `SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = '${dbName}')`
    const dbExists = await db.one(dbExistsQuery);
    
    if (!dbExists.exists){
    const createDbQuery = `CREATE DATABASE ${dbName};`;
    await db.none(createDbQuery);
    console.log('Base de données créée avec succès');
    }
    
    // Connect to the newly created or existing database
    const newDb = pgp({ ...dbConfig, database: dbName });
    
    // Check if the table already exists
    const tableExistsQuery = tableName => `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '${tableName}')`;
    const tableExistsResult = tableName => newDb.one(tableExistsQuery(tableName));
    const tablesExist = (await tableExistsResult('personnes')).exists && (await tableExistsResult('bracelets')).exists && (await tableExistsResult('evenements')).exists;

    if (!tablesExist) {
      // Create the table if it doesn't exist
        const createTableQuery = `
        CREATE TABLE Personnes (
          ID SERIAL PRIMARY KEY,
          Nom VARCHAR(50),
          Prenom VARCHAR(50),
          Adresse VARCHAR(100),
          Email VARCHAR(100),
          Telephone VARCHAR(20),
          MotDePasse VARCHAR(200)
          );
          CREATE TABLE Bracelets (
            IDBracelet INT PRIMARY KEY,
            IDPossesseur INT,
            FOREIGN KEY (IDPossesseur) REFERENCES Personnes(ID)
            );
            CREATE TABLE Evenements (
              IDEvenement INT PRIMARY KEY,
              IDBracelet INT,
              DateHeureEvenement TIMESTAMP,
              IDClient INT,
              EstAppele BOOLEAN,
              EstFausseAlerte BOOLEAN,
              EstInconscient BOOLEAN,
              NumeroUrgenceContacte BOOLEAN,
              DateHeureAppelClient TIMESTAMP,
              DateHeureAppelUrgence TIMESTAMP,
              FOREIGN KEY (IDBracelet) REFERENCES Bracelets(IDBracelet),
              FOREIGN KEY (IDClient) REFERENCES Personnes(ID)
              );
              `;
              await newDb.none(createTableQuery);
              console.log('Table Personnes créée avec succès');
            } 
          } catch (error) {
          console.error('Erreur lors de la création de la base de données :', error);
          // Close the connection
          pgp.end();
        }
}


module.exports = createDatabase;
