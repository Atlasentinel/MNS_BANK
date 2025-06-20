#!/bin/sh
set -e

host="$DB_HOST"
shift

until PGPASSWORD="$DB_PASSWORD" psql -h "$host" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"