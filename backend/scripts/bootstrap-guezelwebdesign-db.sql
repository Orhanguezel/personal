-- Run once (local dev). Pick one:
--
-- A) Ubuntu/Debian (maintenance user, no root password prompt):
--    sudo mysql --defaults-file=/etc/mysql/debian.cnf < scripts/bootstrap-guezelwebdesign-db.sql
--
-- B) Interactive root:
--    mysql -u root -p < scripts/bootstrap-guezelwebdesign-db.sql

CREATE DATABASE IF NOT EXISTS guezelwebdesign
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Match backend .env defaults (DB_USER / DB_PASSWORD)
CREATE USER IF NOT EXISTS 'app'@'127.0.0.1' IDENTIFIED BY 'app';
CREATE USER IF NOT EXISTS 'app'@'localhost' IDENTIFIED BY 'app';

ALTER USER 'app'@'127.0.0.1' IDENTIFIED BY 'app';
ALTER USER 'app'@'localhost' IDENTIFIED BY 'app';

GRANT ALL PRIVILEGES ON guezelwebdesign.* TO 'app'@'127.0.0.1';
GRANT ALL PRIVILEGES ON guezelwebdesign.* TO 'app'@'localhost';

FLUSH PRIVILEGES;
