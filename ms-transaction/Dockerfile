# Build stage
FROM golang:1.24.4 AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o ms-transaction main.go

# Run stage
FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /app/ms-transaction .
EXPOSE 8000
CMD ["./ms-transaction"]
