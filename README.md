# Test Project

This is a simple fullstack application.

## Usage

1. Install Docker and Docker Compose on your machine if not already installed.

2. Create a `.env` file at the root of the project and define the necessary environment variables. Example:

    ```env
    MYSQLDB_PASSWORD=mysecretpassword
    MYSQLDB_LOCAL_PORT=3306
    MYSQLDB_DOCKER_PORT=3306
    TEST_BACKEND_LOCAL_PORT=3000
    TEST_BACKEND_DOCKER_PORT=3000
    TEST_FRONTEND_LOCAL_PORT=8080
    TEST_FRONTEND_DOCKER_PORT=8080
    MYSQLDB_HOST=test-db
    MYSQLDB_USER=root
    MYSQLDB_DATABASE=mydatabase
    ```

3. Run Docker Compose:

    ```bash
    docker-compose up
    ```

4. Your services will be available on the following ports:

    - **MySQL Database:** `localhost:$MYSQLDB_LOCAL_PORT`
    - **Test Backend:** `localhost:$TEST_BACKEND_LOCAL_PORT`
    - **Test Frontend:** `localhost:$TEST_FRONTEND_LOCAL_PORT`

5. Stop the containers:

    ```bash
    docker-compose down
    ```

## Project Structure

- **test-db:** MySQL Database service.
- **test-backend:** Backend.
- **test-frontend:** Frontend.

## Note

- Ensure that the ports specified in your `.env` file do not conflict with ports already in use on your machine.

- This example assumes the use of Node.js for both the backend and frontend. Adjust `./test-backend` and `./test-frontend` accordingly to your requirements.

- Ensure that your applications expect connections to the MySQL Database using the host `test-db` and the port specified in the environment variables.

Happy coding!
