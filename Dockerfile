FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy backend files
COPY backend/pom.xml .
COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/src ./src

# Build the app
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Copy jar file
COPY backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
