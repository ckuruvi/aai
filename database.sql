CREATE DATABASE aai;



CREATE TABLE users_votes(
  id SERIAL PRIMARY KEY,
  user_id character varying(255) NOT NULL,
  video_id character varying(255) NOT NULL,
  date date
);
