## Description

CRUD User management service with [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) interface

## Tech stack
- Spring Boot (Data REST)
- Java 17
- H2
- Flyway
- Gradle

## Instructions

Run with 'local' profile for [test data](./src/main/resources/db/migration/local/V999__test-data.sql) enabled.

`./gradlew bootRun --args='--spring.profiles.active=local'`

Access: http://localhost:8080/users