-- movies
INSERT INTO Movies (title, release_year, genre, director) VALUES
('The Cabin In The Woods', 2011, 'Horror', 'Drew Goddard'),
('Terrifier 3', 2024, 'Horror', 'Damien Leone'),
('Happy Gilmore', 1986, 'Comedy', 'Dennis Dugan'),
('John Wick', 2014, 'Action', 'Chad Stahelski'),
('Insidious The Last Key', 2014, 'Horror', 'Adam Robitel');

-- Customers
INSERT INTO Customers (first_name, last_name, email, phone) VALUES
('Logan', 'Oram', 'loganoram@gmail.com', 5147430667),
('Cole', 'Caufield', 'colecaufield@gmail.com', 5145893246),
('Nick', 'Suzuki', 'nicksuzuki@gmail.com', 5146893319),
('Lane', 'Hutson', 'lanehutson@gmail.com', 5143683201),
('Samuel', 'Montembault', 'sammonty@gmail.com', 5147430667);

-- Rentals
INSERT INTO Rentals (customer_id, movie_id, rental_date, return_date) VALUES
(1, 1, '2024-10-01', '2024-10-7'),
(2, 2, '2024-10-05', '2024-10-15'),
(3, 3, '2024-10-07', NULL), -- Made To Be Rented
(4, 4, '2024-10-10', '2024-10-17'),
(5, 5, '2024-10-12', '2024-10-19'),
(1, 2, '2024-10-14', '2024-10-21'),
(2, 1s, '2024-10-16', NULL), -- Made To Be Rented
(3, 2, '2024-10-17', '2024-10-7'),
(4, 5, '2024-10-18', NULL), -- Made To Be Rented
(5, 1, '2024-10-20', '2024-10-7');

