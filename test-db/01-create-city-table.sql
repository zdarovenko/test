USE cities;
CREATE TABLE city (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_native VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  continent VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 6) NOT NULL,
  longitude DECIMAL(10, 6) NOT NULL,
  population INT NOT NULL,
  founded INT NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
