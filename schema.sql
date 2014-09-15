CREATE TABLE movie (
	movie_id INT AUTO_INCREMENT,
	IMDB_link VARCHAR(200),
	IMDB_rating DOUBLE,
	language VARCHAR(30),
	length INT, # in seconds
	genre VARCHAR(100),
	year CHAR(4),
	title VARCHAR(100) NOT NULL,

	PRIMARY KEY(movie_id)
);

CREATE TABLE director (
	director_id INT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	nationality VARCHAR(30),
	gender CHAR(1),
	profile_pic VARCHAR(200),

	PRIMARY KEY(director_id)
);

CREATE TABLE direct (
	movie_id INT,
	director_id INT,

	FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
	FOREIGN KEY (director_id) REFERENCES director(director_id)
);

CREATE TABLE act (
	movie_id INT,
	actor_id INT,
	role VARCHAR(30) NOT NULL,

	FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
	FOREIGN KEY (actor_id) REFERENCES actor(actor_id)
);