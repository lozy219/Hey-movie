DROP TABLE IF EXISTS movie ;
CREATE TABLE movie (
	movie_id INT AUTO_INCREMENT,
	IMDB_link VARCHAR(200),
	IMDB_rating DOUBLE,
	language VARCHAR(30),
	length INT, # in mins
	genre VARCHAR(100),
	year CHAR(4),
	title VARCHAR(100) NOT NULL,
	-- director_id INT,
	showing_status VARCHAR(20), # only can be "on show", "trailer" or "off show" or null
	poster_link VARCHAR(200), 

	PRIMARY KEY (movie_id)
	-- FOREIGN KEY (director_id) REFERENCES director(director_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS director;
-- CREATE TABLE director (
-- 	director_id INT AUTO_INCREMENT,
-- 	name VARCHAR(30) NOT NULL,
-- 	nationality VARCHAR(30),
-- 	gender CHAR(1),
-- 	profile_pic VARCHAR(200),

-- 	PRIMARY KEY (director_id)
-- );

-- DROP TABLE IF EXISTS actor;
-- CREATE TABLE actor (
-- 	actor_id INT AUTO_INCREMENT,
-- 	name VARCHAR(30) NOT NULL,
-- 	nationality VARCHAR(30),
-- 	gender CHAR(1),
-- 	profile_pic VARCHAR(200),

-- 	PRIMARY KEY (actor_id)
-- );

-- DROP TABLE IF EXISTS act;
-- CREATE TABLE act (
-- 	movie_id INT,
-- 	actor_id INT,
-- 	role VARCHAR(30) NOT NULL,

-- 	PRIMARY KEY(movie_id, actor_id),
-- 	FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE,
-- 	FOREIGN KEY (actor_id) REFERENCES actor(actor_id) ON DELETE CASCADE
-- );

DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
	customer_id INT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	password VARCHAR(500) NOT NULL,
	contact VARCHAR(8),
	email VARCHAR(50),
	register_date DATE,
	DOB DATE,
	profile_pic VARCHAR(200),

	PRIMARY KEY (customer_id)
); 

DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
	customer_id INT AUTO_INCREMENT,
	movie_id INT,
	comment_date DATE,
	content VARCHAR(300),

	PRIMARY KEY(customer_id, movie_id),
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
	FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS cinema_operator;
CREATE TABLE cinema_operator(
	operator_id INT AUTO_INCREMENT,
	country CHAR(30),
	operator_name VARCHAR(100),
	
	PRIMARY KEY (operator_id)
);

DROP TABLE IF EXISTS theatre;
CREATE TABLE theatre (
	theatre_id INT AUTO_INCREMENT,
	name VARCHAR(50),
	location VARCHAR(200),
	postal_code CHAR(6),
	contact CHAR(8),
	operator_id INT,

	PRIMARY KEY (theatre_id),
	FOREIGN KEY (operator_id) REFERENCES cinema_operator(operator_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS shows;
CREATE TABLE shows (
	show_id INT AUTO_INCREMENT,
	movie_id INT,
	theatre_id INT,
	start_time TIMESTAMP,
	end_time TIMESTAMP,
	subtitle CHAR(30),

	PRIMARY KEY(show_id),
	FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE,
	FOREIGN KEY (theatre_id) REFERENCES theatre(theatre_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS ticket;
CREATE TABLE ticket (
	ticket_id INT AUTO_INCREMENT,
	customer_id INT,
	booking_time TIMESTAMP,
	price DOUBLE,
	seat_no VARCHAR(5),
	hall_no INT,

	PRIMARY KEY (ticket_id),
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);


INSERT INTO MOVIE(IMDB_link, IMDB_rating, language, length, 
	genre, year, title, showing_status, poster_link) 
VALUES("http://www.imdb.com/title/tt0120338/?ref_=nv_sr_1", 
	7.7, "English", 194, "Drama", "1997", "Titanic", null, 
	"http://ildisoccupatoillustre.files.wordpress.com/2014/02/titanic-locandina-film.jpg");

INSERT INTO MOVIE(IMDB_link, IMDB_rating, language, length, 
	genre, year, title, showing_status, poster_link) 
VALUES("http://www.imdb.com/title/tt0816692/?ref_=inth_ov_tt", 
	9.4, "English", 169, "Adventure", "2014", "Interstellar", "on show", 
	"http://www.hollywoodreporter.com/sites/default/files/imagecache/blog_post_349_width/2014/05/interstellar.jpg");

INSERT INTO MOVIE(IMDB_link, IMDB_rating, language, length, 
	genre, year, title, showing_status, poster_link) 
VALUES("http://www.imdb.com/title/tt2245084/?ref_=inth_ov_tt", 
	8.1, "English", 108, "Science", "2014", "Big Hero 6", "on show", 
	"http://cdn.hitfix.com/photos/5586249/Disney_BigHero6_Poster_Baymax.jpg");

INSERT INTO MOVIE(IMDB_link, IMDB_rating, language, length, 
	genre, year, title, showing_status, poster_link) 
VALUES("http://www.imdb.com/title/tt2267998/?ref_=inth_ov_tt", 
	8.5, "English", 149, "Drama", "2014", "Gone Girl", "on show", 
	"https://janeaustenrunsmylife.files.wordpress.com/2014/10/mv5bmtk0mdq3mzazov5bml5banbnxkftztgwnzu1nze3mje-_v1_sx640_sy720_.jpg");

INSERT INTO MOVIE(IMDB_link, IMDB_rating, language, length, 
	genre, year, title, showing_status, poster_link) 
VALUES("http://www.imdb.com/title/tt1972779/?ref_=inth_ov_tt", 
	6.2, "English", 118, "Drama", "2014", "The Best of Me", "on show", 
	"http://4.bp.blogspot.com/-744LsYne6tE/U9JKQwebWVI/AAAAAAAAZRc/EuvMUXtiBHw/s1600/the+best+of+me.jpg");

INSERT INTO MOVIE(IMDB_link, IMDB_rating, language, length, 
	genre, year, title, showing_status, poster_link) 
VALUES("http://www.imdb.com/title/tt1872194/?ref_=inth_ov_tt", 
	7.7, "English", 141, "Drama", "2014", "The Judge", "on show", 
	"http://ww3.sinaimg.cn/large/78afe499gw1ek1f20ak7uj20uq19i16e.jpg");