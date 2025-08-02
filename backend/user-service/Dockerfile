FROM gradle:8.4.0-jdk17 AS build

WORKDIR /app

COPY build.gradle.kts .
COPY src ./src

RUN gradle clean build -DskipTests

FROM eclipse-temurin:17

WORKDIR /app
COPY --from=build /app/build/libs/*.jar application.jar

ENTRYPOINT ["java","-jar","/app/application.jar"]
