-- Create separate databases for each service
CREATE DATABASE deskhq_core;
CREATE DATABASE deskhq_chat;
CREATE DATABASE deskhq_ai;

-- Grant all privileges to our user
GRANT ALL PRIVILEGES ON DATABASE deskhq TO deskhq_user;
GRANT ALL PRIVILEGES ON DATABASE deskhq_core TO deskhq_user;
GRANT ALL PRIVILEGES ON DATABASE deskhq_chat TO deskhq_user;
GRANT ALL PRIVILEGES ON DATABASE deskhq_ai TO deskhq_user;

-- Connect to deskhq_core and create extensions
\c deskhq_core;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c deskhq;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";