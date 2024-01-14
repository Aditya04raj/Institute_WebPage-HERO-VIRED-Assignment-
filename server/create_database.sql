-- Create a database
CREATE DATABASE institute_programs;

-- Connect to the new database
\c institute_programs;

-- Create a 'programs' table
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    domain VARCHAR(255) NOT NULL,
    program_type VARCHAR(50) NOT NULL,
    registrations_status VARCHAR(10) NOT NULL,
    description TEXT NOT NULL,
    placement_assurance BOOLEAN NOT NULL,
    image_url VARCHAR(255),
    university_name VARCHAR(255),
    faculty_profile VARCHAR(255),
    learning_hours INTEGER,
    duration VARCHAR(50),
    certificate_diploma VARCHAR(50),
    eligibility_criteria TEXT
);
