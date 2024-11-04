CREATE TABLE Movies (
movie_id SERIAL PRIMARY KEY,
title VARCHAR(225) NOT NULL,
release_year INT,
genre VARCHAR(50),
director VARCHAR(225)
);

CREATE TABLE Customers (
customer_id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email VARCHAR(100) UNIQUE,
phone TEXT
);

CREATE TABLE Rentals (
rental_id SERIAL PRIMARY KEY,
customer_id INT REFERENCES Customers(customer_id),
movie_id INT REFERENCES Movies(movie_id),
rental_date DATE,
return_date DATE
);
