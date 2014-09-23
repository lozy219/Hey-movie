CREATE TABLE movie (
	movie_id INT AUTO_INCREMENT,
	IMDB_link VARCHAR(200),
	IMDB_rating DOUBLE,
	language VARCHAR(30),
	length INT, # in seconds
	genre VARCHAR(100),
	year CHAR(4),
	title VARCHAR(100) NOT NULL,

	PRIMARY KEY (movie_id)
);

CREATE TABLE director (
	director_id INT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	nationality VARCHAR(30),
	gender CHAR(1),
	profile_pic VARCHAR(200),

	PRIMARY KEY (director_id)
);

CREATE TABLE direct (
	movie_id INT,
	director_id INT,

	FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
	FOREIGN KEY (director_id) REFERENCES director(director_id)
);

CREATE TABLE actor (
	actor_id INT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	nationality VARCHAR(30),
	gender CHAR(1),
	profile_pic VARCHAR(200),

	PRIMARY KEY (actor_id)
);

CREATE TABLE act (
	movie_id INT,
	actor_id INT,
	role VARCHAR(30) NOT NULL,

	FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
	FOREIGN KEY (actor_id) REFERENCES actor(actor_id)
);

CREATE TABLE customer (
	customer_id INT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	contact VARCHAR(8),
	register_date INT,
	DOB INT,
	profile_pic VARCHAR(200),

	PRIMARY KEY (customer_id)
); 

CREATE TABLE comment (
	customer_id INT,
	movie_id INT,
	comment_date INT,
	content VARCHAR(300),

	FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
	FOREIGN KEY (movie_id) REFERENCES movie(movie_id)
);

CREATE TABLE theater (
	theater_id INT AUTO_INCREMENT,
	name VARCHAR(50),
	location VARCHAR(200),
	postal_code CHAR(6),
	contact CHAR(8),

	PRIMARY KEY (theater_id)
);

CREATE TABLE shows (
	show_id INT AUTO_INCREMENT,
	movie_id INT,

	FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
	FOREIGN KEY (theater_id) REFERENCES theater(theater_id)
);

CREATE TABLE ticket (
	ticket_id INT AUTO_INCREMENT,
	customer_id INT,
	booking_time TIMESTAMP,
	price DOUBLE,
	seat_no VARCHAR(5),
	show_id INT AUTO_INCREMENT,
	theater_id INT,
	start_time TIMESTAMP,
	end_time TIMESTAMP,
	subtitle VARCHAR(30),
	hall_no INT,

	PRIMARY KEY (ticket_id),
	FOREIGN KEY (theater_id) REFERENCES theater(theater_id)	
	FOREIGN KEY (show_id) REFERENCES shows(show_id),
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);
