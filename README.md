## Build app

```
docker compose up --build --force-recreate
```

## Commands

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
