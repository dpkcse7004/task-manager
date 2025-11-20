FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy Maven wrapper and config
COPY mvnw .
COPY backend/mvnw.cmd .
COPY .mvn .mvn

# Copy pom.xml
COPY pom.xml .

# Copy source code
COPY src ./src

# Give execution permission (Linux)
RUN chmod +x mvnw

# Build the jar
RUN ./mvnw clean package -DskipTests

# Copy the generated jar
COPY backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
