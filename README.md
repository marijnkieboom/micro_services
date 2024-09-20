## Build app

```
docker compose up --build --force-recreate
```

Windows users are advised to run this Docker container under WSL2 (Windows Subsystem for Linux). Mac and Linux users should be fine out-of-the-box.

## Create Database `user` Table

Connect to the MariaDB database (via DBeaver for instance), use credentials for root user, found in `docker-compose.yml`.

Then add a `user` table using the following SQL-command:

```SQL
CREATE TABLE cqrs_db.users (
	id INT auto_increment NOT NULL,
	name varchar(255) NULL,
	email varchar(255) NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;
```

## Terminal Commands
Once the Docker container is running, you can use the Terminal commands below to play with the database.

Create a User:

```
curl -X POST http://localhost:3000/command/users -H "Content-Type: application/json" -d '{"name":"Marijn Kieboom","email":"mkieboom@mysolution.com"}'
```

Get All Users:

```
curl http://localhost:3000/query/users
```

Get a User by ID:

```
curl http://localhost:3000/query/users/<user-id>
```

Update a User:

```
curl -X PUT http://localhost:3000/command/users/<user-id> -H "Content-Type: application/json" -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

Delete a User:

```
curl -X DELETE http://localhost:3000/command/users/<user-id>
```


Message Queueing Services focus on asynchronous communication between seperate parts of the application, while load balancing services focus on synchronous communication between clients and one or more back-end servers

https://www.architect.io/blog/2022-03-21/production-environment-at-different-sizes/
