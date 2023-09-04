FROM postgres 

ENV POSTGRES_DB loansforgood

COPY initdb.sql /docker-entrypoint-initdb.d/