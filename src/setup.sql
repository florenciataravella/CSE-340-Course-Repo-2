CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
SELECT * FROM organization;
INSERT INTO organization (name, description, contact_email, logo_filea)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);
CREATE TABLE categories (
    category_id SERIAL NOT NULL PRIMARY KEY,
    category_name VARCHAR(150) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL NOT NULL PRIMARY KEY,
    project_name VARCHAR(150)
);

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES projects(project_id),

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);
SELECT * FROM project_categories;
SELECT * FROM projects;
ALTER TABLE projects
RENAME COLUMN project_name TO title;

ALTER TABLE projects
ADD COLUMN organization_id INTEGER
    REFERENCES organization(organization_id),
ADD COLUMN description TEXT,
ADD COLUMN location VARCHAR(255),
ADD COLUMN date DATE;

UPDATE projects
SET organization_id = 3,
    description = 'Help volunteers remove litter from shared community spaces.',
    location = 'Community Park',
    date = '2026-11-07'
WHERE project_id = 1;

UPDATE projects
SET organization_id = 2,
    description = 'Plant trees to expand green spaces in local neighborhoods.',
    location = 'Community Garden',
    date = '2026-11-14'
WHERE project_id = 2;

UPDATE projects
SET organization_id = 2,
    description = 'Collect recyclable materials and teach residents how to sort waste.',
    location = 'Neighborhood Recycling Center',
    date = '2026-11-21'
WHERE project_id = 3;

UPDATE projects
SET organization_id = 3,
    description = 'Provide homework support and individual tutoring for students.',
    location = 'Public Library',
    date = '2026-11-10'
WHERE project_id = 4;

UPDATE projects
SET organization_id = 3,
    description = 'Help children and adults develop reading and writing skills.',
    location = 'Community Learning Center',
    date = '2026-11-17'
WHERE project_id = 5;

UPDATE projects
SET organization_id = 1,
    description = 'Teach basic repair skills and safe tool use through practical workshops.',
    location = 'Community Workshop',
    date = '2026-11-28'
WHERE project_id = 6;

UPDATE projects
SET organization_id = 2,
    description = 'Collect fresh produce and other food donations for families in need.',
    location = 'Local Food Bank',
    date = '2026-12-05'
WHERE project_id = 7;

UPDATE projects
SET organization_id = 3,
    description = 'Collect and organize clothing donations for local families.',
    location = 'Community Donation Center',
    date = '2026-12-12'
WHERE project_id = 8;

UPDATE projects
SET organization_id = 3,
    description = 'Assist older adults with errands, household tasks, and companionship.',
    location = 'Senior Community Center',
    date = '2026-12-19'
WHERE project_id = 9;
SELECT * FROM projects;
ALTER TABLE projects
ALTER COLUMN organization_id SET NOT NULL;
SELECT * FROM projects;

SELECT p.project_id,
        p.project_name,
        p.organization_id,
        p.description,
        p.location,
        p.date, o.name 
FROM projects p
JOIN organization o
ON p.organization_id = o.organization_id;
