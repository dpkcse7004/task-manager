# Use Java image
FROM eclipse-temurin:17-jdk

# Install Maven
RUN apt update && apt install -y maven

# Set working directory
WORKDIR /app

# Copy backend code
COPY backend/pom.xml .
COPY backend/src ./src

# Build using Maven
RUN mvn clean package -DskipTests

# Copy built jar
COPY backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
