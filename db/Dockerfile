FROM postgis/postgis:16-3.4

COPY dump.sql /docker-entrypoint-initdb.d/
COPY index.sql /docker-entrypoint-initdb.d/