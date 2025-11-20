FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy Maven wrapper and config
COPY backend/mvnw .
COPY backend/mvnw.cmd .
COPY backend/.mvn .mvn

# Copy pom.xml
COPY backend/pom.xml .

# Copy source code
COPY backend/src ./src

# Give execution permission (Linux)
RUN chmod +x mvnw

# Build the jar
RUN ./mvnw clean package -DskipTests

# Copy the generated jar
COPY backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
