CREATE TYPE gender AS ENUM ('Male', 'Female', 'Unknown');
CREATE TABLE hedgehog (
    "id" serial NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sex" gender,
    "location" POINT
);
