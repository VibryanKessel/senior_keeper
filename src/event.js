async function getEvent(id) {
    try {
      const query = 'SELECT * FROM evenements WHERE id_evenement = $1';
      return  await db.one(query, [id])
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }

module.exports = getEvent;
