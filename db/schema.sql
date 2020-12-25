
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
CREATE TABLE candidates (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL,
  party_id iNTEGER UNSIGNED,
  CONSTRAINT fk_party FOREIGN KEY (party_id)REFERENCES parties(id) ON DELETE  SET NULL
);

CREATE TABLE parties (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);
