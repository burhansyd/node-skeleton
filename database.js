const getUserWithEmail = function (email, db) {
  //Define query
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [email])
      .then((result) => {
        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows[0];
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getUserWithId = function (id, db) {
  //Define query
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        // console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows[0];
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getParksWithCreatorId = function (id, db) {
  //Define query
  const queryString = `
  SELECT parks.id as park_id, park_name, creator_id, users.name as creator_name, coordinates_long, coordinates_lat
  FROM parks
  JOIN users ON users.id = creator_id
  WHERE creator_id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        // console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getParksWithMapId = function (id, db) {
  //Define query
  const queryString = `
  SELECT parks.id as park_id, park_name, maps.id as map_id, maps.name as map_name, coordinates_long, coordinates_lat
  FROM parks
  JOIN maps ON maps.id = map_id
  WHERE maps.id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        // console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getParksForMarkerWithMapId = function (id, db) {
  //Define query
  const queryString = `
  SELECT coordinates_long, coordinates_lat
  FROM parks
  JOIN maps ON maps.id = map_id
  WHERE maps.id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        // console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getMapsWithCreatorId = function (id, db) {
  //Define query
  const queryString = `
  SELECT maps.id as map_id, maps.name as map_name, creator_id, description, users.name as creator_name
  FROM maps
  JOIN users ON users.id = creator_id
  WHERE creator_id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getUserWithEmailOrName = function (name, email, db) {
  //Define query
  const queryString = `
  SELECT *
  FROM users
  WHERE name = $1 OR email = $2
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [name, email])
      .then((result) => {
        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the array for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const addUserToUsers = function (name, email, password, db) {
  //Define query
  const queryString = `
  INSERT INTO users
  (name, email, password)
  VALUES
  ($1, $2, $3)
  RETURNING *;
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [name, email, password])
      .then((result) => {
        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the array for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
}





module.exports = {
  getUserWithEmail,
  getUserWithId,
  getParksWithCreatorId,
  getParksWithMapId,
  getMapsWithCreatorId,
  getParksForMarkerWithMapId,
  getUserWithEmailOrName,
  addUserToUsers
};
