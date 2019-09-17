DROP TABLE IF EXISTS chats;

CREATE TABLE chats (
 id SERIAL PRIMARY KEY,
 sender_id INT NOT NULL REFERENCES users(id),
 message VARCHAR(1000),
 posted_date VARCHAR(500),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);