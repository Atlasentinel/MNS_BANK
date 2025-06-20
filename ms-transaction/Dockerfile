# Build stage
FROM golang:1.24.4 AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o ms-transaction main.go

# Run stage
FROM debian:bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/ms-transaction .
EXPOSE 8000
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh
CMD ["/wait-for-postgres.sh", "./ms-transaction"]
