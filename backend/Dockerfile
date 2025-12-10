FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Don't rely on executable permissions (Windows issue fix)
RUN sh mvnw dependency:resolve

COPY src ./src

RUN sh mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/*.jar"]
