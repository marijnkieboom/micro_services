## Build app

```
docker compose up --build --force-recreate
```

```
docker save mycontainer > mycontainer.tar
microk8s ctr image import mycontainer.tar
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
curl -X PUT http://localhost:3000/users/<user-id> -H "Content-Type: application/json" -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

Delete a User:

```
curl -X DELETE http://localhost:3000/users/<user-id>
```

## SQRS TODO

Normal CRUD:

- Controller layer handles HTTP request and delegates tasks to the services layer
- The services layer is where the business logic is implemented
- Services use repositories to change / persist entities
- Entities act as containers for the values, with getters and setters

This is sufficient for most applications, but for largers and more complext applications, the SQRS (Command and Query Responsibility Segregation) model may be more appropriate and scalable.

https://itnext.io/simple-cqrs-in-nodejs-with-typescript-6da6d3e8a420
https://github.com/meysamhadeli/booking-microservices-expressjs

## Example: Recruitment Management System

#### Use Case 1: Job Posting and Application Process (Commands)

The agency needs to manage job postings, applications, candidate profiles, and the interview process. The command model should be designed to efficiently handle the frequent creation and updating of job postings, candidate profiles, and application statuses. The data model for this should be fully normalized, focusing on ensuring data integrity, consistency and minimizing redundancy.

Example Data Structure:

- Candidate Table
  - Candidate Id
  - Contact Details
  - Status
- Job Posting Table
  - Customer Id
  - Job Id
  - Description
  - Status
- Application Table
  - Application Id
  - Job Id
  - Candidate Id
  - Date
  - Status
- Interview Table
  - Interview Id
  - Application Id
  - Date
  - Status

#### Use Case 2: Candidate Search and Reporting (Queries):

The agency frequently needs to search through candidate profiles based on various criteria (e.g., skills, experience, location) and generate reports on application pipelines, placement success rates, and candidate demographics. The query model should be optimized to handle complex search queries, aggregate data, and generate reports quickly. This model would denormalized data, such as premade joins, aggregations, and calculations.

Example Data Structure:

- Candidate View Table
  - Candidate Id
  - Name
  - Total Applications
  - Last Application Date
  - Status (based on the latest data, e.g. 'Hired' or 'Inactive')
- Job Pipeline View Table
  - Job Id
  - Job Details
  - Customer Details
  - Total Applications
  - Status (based on all applications)
- Customer View Table
  - Customer Id
  - Contact Details
  - Total Hires
  - Average Time to Hire
  - Succes Rate
  - YoY Change in Revenue

### Benefits of seperate models

1. Performance Optimization:
   - Command Model: Focuses on fast writes, ensuring data integrity through normalization. This minimizes the impact of frequent inserts, updates and deletes.
   - Query Model: Focuses on fast reads, escpecially for complex queries. Denormalization and pre-aggregated data reduces the computational load during querying.
2. Scalability:
   - Both models can be scaled independently, in most cases there will be a lot more query-requests than command-requests (depends on the use case).
3. Eventual Consistency:
   - The query model can be eventually consistent, meaning however that there will be a delay.
4. Flexibility:
   - New tables in the existing data source would probably suffice, but it is possible to use different data sources. For example, to use a relational database, such as MSSQL, for the command model (optimized for data normalization), and to use a NoSQL database, such as MongoDB, for the query model (optimized for read speeds).

### Drawbacks

1. Increased Complexity:
   - Maintaining two seperate models require additional infrastructure and careful management of data synchronization.
2. Data Synchronization:
   - Implementing a mechanism to keep the query model updates, e.g. via a event-driven architecture, introduces lots of complexity and possible points of failures.
3. Storage Overhead:
   - A lot more redundancy will be introduced with seperate query and command data stores.

## Message Queuing Systems vs Load Balacing Systems

Message Queueing Services focus on asynchronous communication between seperate parts of the application, while load balancing services focus on synchronous communication between clients and one or more back-end servers

https://www.architect.io/blog/2022-03-21/production-environment-at-different-sizes/
