FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY backend/mvnw .
COPY backend/mvnw.cmd .
COPY backend/pom.xml .

# Copy source code
COPY backend/src ./src

RUN chmod +x mvnw

# Build the jar
RUN ./mvnw -q clean package -DskipTests

# Copy the jar file
COPY backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
