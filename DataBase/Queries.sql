SELECT movies.title
FROM Rentals
JOIN Customers ON Rentals.customer_id = Customers.customer_id
JOIN Movies ON Rentals.movie_id = Movies.movie_id
WHERE Customers.email = 'loganoram@gmail.com';

SELECT Customers.first_name, Customers.last_name
FROM Rentals
JOIN Customers ON Rentals.customer_id = Customers.customer_id
JOIN Movies ON Rentals.movie_id = Movies.movie_id
WHERE Movies.title = 'Happy Gilmore';

SELECT Rentals.rental_date, Rentals.return_date, Customers.first_name, Customers.last_name
FROM Rentals
JOIN Customers ON Rentals.customer_id = Customers.customer_id
JOIN Movies ON Rentals.movie_id = Movies.movie_id
WHERE Movies.title = 'The Cabin In The Woods';

SELECT Customers.first_name, Customers.last_name, Rentals.rental_date, Movies.title
FROM Rentals
JOIN Customers ON Rentals.customer_id = Customers.customer_id
JOIN Movies ON Rentals.movie_id = Movies.movie_id
WHERE Movies.director = 'Chad Stahelski';

SELECT Movies.title
FROM Rentals
JOIN Movies ON Rentals.movie_id = Movies.movie_id
WHERE Rentals.return_date IS NULL;
