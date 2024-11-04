const { Pool } = require('pg');
require('dotenv').config();


// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Movies (
        movie_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        release_year INTEGER NOT NULL,
        genre TEXT NOT NULL,
        director TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Customers (
        customer_id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Rentals (
        rental_id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES Customers(customer_id) ON DELETE CASCADE,
        movie_id INTEGER NOT NULL REFERENCES Movies(movie_id) ON DELETE CASCADE,
        rental_date DATE NOT NULL,
        return_date DATE
      );
    `);
    console.log('The Tables Were Created With No Issues!');
  } catch (error) {
    console.error('Error creating the tables: ', error);
  }
};

/**
 * Inserts a new movie into the Movies table.
 * 
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  try {
    await pool.query(`
      INSERT INTO Movies (title, release_year, genre, director)
      VALUES ($1, $2, $3, $4)
    `, [title, year, genre, director]);
    console.log('Movie Added Successfully!');
  } catch (error) {
    console.error('Error Adding Movie:', error);
  }
}


/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  try {
    const res = await pool.query('SELECT * FROM Movies');
    console.log('Movies:', res.rows);
  } catch (error) {
    console.error('Error Displaying Movies:', error);
  }
}


/**
 * Updates a customer's email address.
 * 
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  try {
    await pool.query(`
      UPDATE Customers SET email = $1 WHERE customer_id = $2
    `, [newEmail, customerId]);
    console.log('Customer Email Updated Successfully!');
  } catch (error) {
    console.error('Error Updating Customer Email:', error);
  }
}


/**
 * Removes a customer from the database along with their rental history.
 *x
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  try {
    await pool.query(`
      DELETE FROM Customers WHERE customer_id = $1
    `, [customerId]);
    console.log('Customer And Rental History Removed Successfully!');
  } catch (error) {
    console.error('Error Removing Customer:', error);
  }
}


/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log('Usage:');
  console.log('  insert "title" year "genre" "director" --- Insert A Movie');
  console.log('  show --- Show All Movies');
  console.log('  update "customer_id" "new_email" --- Update A Customer\'s Email');
  console.log('  remove "customer_id" --- Remove A Customer From The Database');
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case 'insert':
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case 'show':
      await displayMovies();
      break;
    case 'update':
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case 'remove':
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
};

runCLI();
