Hey-movie
=========
**An Online Movie Ticket Booking System**

CS2102 Group 74 Project 1  
[Lin Fanshi](https://github.com/fanshicomic)  
[Lei Mingyu](https://github.com/lozy219)  
[Sun Yuxuan](https://github.com/VIN-S)  


####1. Project Overview

The project is aimed at developing an integrated online movie ticket booking system, which is named as “**Hey Movie!**”. The system will be connected to a database for saving booking information and be displayed as a website for its users. The users of the system will be generally divided into two types: Customers and Administrators.

For customers, they can search movies even without having an account. Different search criteria, such as directors, movie genre and so on will be provided to help customers look for what they like. However, if they want to book the ticket or make comments on movies, they will have to log in the system. 

For administrators, they will have a different interface after logging in. Through the system, they can create, modify and delete bookings.


####2. Design Specification
######2.1 Techniques and Tools 

As mentioned above, the system will be connected to a database and displayed as a website. Hence, the techniques and softwares will involve the following:

Techniques              | Tools           | 
----------------------- | --------------- | 
HTML, CSS, SQL, Node.js | MySQL, Git, koa |

######2.2 Relational Schema

* **Movie** (*movie_id*, IMDB_link, IMDB_rating, language, length, genre, year, title)
* **Director** (*director_id*, name, nationality, gender,profile_pic)
* **Direct** (movie_id, director_id)
* **Actor** (*actor_id*, name, nationality, gender, profile_pic)
* **Act** (movie_id, actor_id, role)
* **Customer** (*customer_id*, name, contact, register_date, DOB, profile_pic)
* **Comment** (customer_id, movie_id, comment_date, content)
* **Theater** (*theater_id*, name, location, postal_code, contact)
* **Shows** (*show_id*, movie_id, theater_id, start_time, end_time, subtitle, hall_no)
* **Ticket** (*ticket_id*, show_id, customer_id, booking_time, price, seat_no)



####3. Entity-Relationship Diagram
![Alt text](http://oi59.tinypic.com/167p954.jpg "ER diagram")



####4. SQL DDL Code
	DROP TABLE IF EXISTS movie;
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
	
	DROP TABLE IF EXISTS director;
	CREATE TABLE director (
		director_id INT AUTO_INCREMENT,
		name VARCHAR(30) NOT NULL,
		nationality VARCHAR(30),
		gender CHAR(1),
		profile_pic VARCHAR(200),
	
		PRIMARY KEY (director_id)
	);
	
	DROP TABLE IF EXISTS actor;
	CREATE TABLE actor (
		actor_id INT AUTO_INCREMENT,
		name VARCHAR(30) NOT NULL,
		nationality VARCHAR(30),
		gender CHAR(1),
		profile_pic VARCHAR(200),
	
		PRIMARY KEY (actor_id)
	);
	
	DROP TABLE IF EXISTS act;
	CREATE TABLE act (
		movie_id INT,
		actor_id INT,
		role VARCHAR(30) NOT NULL,
	
		PRIMARY KEY(movie_id, actor_id),
		FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE,
		FOREIGN KEY (actor_id) REFERENCES actor(actor_id) ON DELETE CASCADE
	);
	
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
		customer_id INT,
		movie_id INT,
		comment_date DATE,
		content VARCHAR(300),
	
		PRIMARY KEY(customer_id, movie_id),
		FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
		FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE
	);
	
	DROP TABLE IF EXISTS cinema_operator;
	CREATE TABLE cinema_operator(
		operator_id VARCHAR(50),
		country CHAR(30),
		
		PRIMARY KEY (operator_id)
	);
	
	DROP TABLE IF EXISTS theater;
	CREATE TABLE theater (
		theater_id INT AUTO_INCREMENT,
		name VARCHAR(50),
		location VARCHAR(200),
		postal_code CHAR(6),
		contact CHAR(8),
		operator_id VARCHAR(50),
	
		PRIMARY KEY (theater_id),
		FOREIGN KEY (operator_id) REFERENCES cinema_operator(operator_id) ON DELETE CASCADE
	);
	
	DROP TABLE IF EXISTS shows;
	CREATE TABLE shows (
		show_id INT AUTO_INCREMENT,
		movie_id INT,
		thearter_id INT,
		start_time TIMESTAMP,
		end_time TIMESTAMP,
		subtitle CHAR(30),
	
		PRIMARY KEY(show_id),
		FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE,
		FOREIGN KEY (theater_id) REFERENCES theater(theater_id) ON DELETE CASCADE
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
