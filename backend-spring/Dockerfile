FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
CMD ["./mvnw", "spring-boot:run"]
