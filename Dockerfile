FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY backend/pom.xml .
COPY backend/src ./src

RUN ./mvnw clean package -DskipTests || mvn -q clean package -DskipTests

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
