#!/bin/bash
if psql -lqt | cut -d \| -f 1 | grep -qw $POSTGRES_DB; then
  echo "Database already exists"
else
  # ruh-roh
  # $? is 1
  echo $POSTGRES_DB
  psql --host=$POSTGRES_HOST --port=$POSTGRES_PORT -c "
    CREATE USER $POSTGRES_USERNAME;
    CREATE DATABASE $POSTGRES_DB;
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USERNAME;"
fi
