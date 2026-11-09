SELECT NOW();

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
SELECT * FROM organization;
INSERT INTO organization (name, description, contact_email, logo_filename)
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

SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'projects';

SELECT * FROM categories;
SELECT * FROM projects;
SELECT * FROM organization;
INSERT INTO categories (category_id, category_name)
VALUES
    (1, 'Environmental Care'),
    (2, 'Education and Mentoring'),
    (3, 'Community Support');

INSERT INTO projects (project_id, project_name, organization_id)
VALUES
    (1, 'Community Cleanups', 3),
    (2, 'Tree Planting', 2),
    (3, 'Recycling Projects', 2),
    (4, 'Tutoring', 3),
    (5, 'Literacy Programs', 3),
    (6, 'Teaching Useful Skills', 1),
    (7, 'Food Drives', 2),
    (8, 'Clothing Donations', 3),
    (9, 'Helping Older Adults', 3);
UPDATE projects
SET description = 'Help volunteers remove litter from shared community spaces.',
    location = 'Community Park',
    date = '2026-11-07'
WHERE project_id = 1;

UPDATE projects
SET description = 'Plant trees to expand green spaces in local neighborhoods.',
    location = 'Community Garden',
    date = '2026-11-14'
WHERE project_id = 2;

UPDATE projects
SET description = 'Collect recyclable materials and teach residents how to sort waste.',
    location = 'Neighborhood Recycling Center',
    date = '2026-11-21'
WHERE project_id = 3;

UPDATE projects
SET description = 'Provide homework support and individual tutoring for students.',
    location = 'Public Library',
    date = '2026-11-10'
WHERE project_id = 4;

UPDATE projects
SET description = 'Help children and adults develop reading and writing skills.',
    location = 'Community Learning Center',
    date = '2026-11-17'
WHERE project_id = 5;

UPDATE projects
SET description = 'Teach basic repair skills and safe tool use through practical workshops.',
    location = 'Community Workshop',
    date = '2026-11-28'
WHERE project_id = 6;

UPDATE projects
SET description = 'Collect fresh produce and other food donations for families in need.',
    location = 'Local Food Bank',
    date = '2026-12-05'
WHERE project_id = 7;

UPDATE projects
SET description = 'Collect and organize clothing donations for local families.',
    location = 'Community Donation Center',
    date = '2026-12-12'
WHERE project_id = 8;

UPDATE projects
SET description = 'Assist older adults with errands, household tasks, and companionship.',
    location = 'Senior Community Center',
    date = '2026-12-19'
WHERE project_id = 9;

SELECT * FROM projects
ORDER BY project_id;
ALTER TABLE public.categories
ADD COLUMN description TEXT;

UPDATE public.categories
SET description = 'Protect and improve the environment through community cleanups, tree planting, and recycling projects.'
WHERE category_id = 1;

UPDATE public.categories
SET description = 'Support learning and personal growth through tutoring, literacy programs, and practical skills workshops.'
WHERE category_id = 2;

UPDATE public.categories
SET description = 'Help people in need through food drives, clothing donations, and assistance for older adults.'
WHERE category_id = 3;

SELECT * FROM public.categories
ORDER BY category_id;

UPDATE projects
SET description = 'Help volunteers remove litter from shared community spaces.',
    location = 'Community Park',
    date = '2026-11-07'
WHERE project_id = 1;

UPDATE projects
SET description = 'Plant trees to expand green spaces in local neighborhoods.',
    location = 'Community Garden',
    date = '2026-11-14'
WHERE project_id = 2;

UPDATE projects
SET description = 'Collect recyclable materials and teach residents how to sort waste.',
    location = 'Neighborhood Recycling Center',
    date = '2026-11-21'
WHERE project_id = 3;

UPDATE projects
SET description = 'Provide homework support and individual tutoring for students.',
    location = 'Public Library',
    date = '2026-11-10'
WHERE project_id = 4;

UPDATE projects
SET description = 'Help children and adults develop reading and writing skills.',
    location = 'Community Learning Center',
    date = '2026-11-17'
WHERE project_id = 5;

UPDATE projects
SET description = 'Teach basic repair skills and safe tool use through practical workshops.',
    location = 'Community Workshop',
    date = '2026-11-28'
WHERE project_id = 6;

UPDATE projects
SET description = 'Collect fresh produce and other food donations for families in need.',
    location = 'Local Food Bank',
    date = '2026-12-05'
WHERE project_id = 7;

UPDATE projects
SET description = 'Collect and organize clothing donations for local families.',
    location = 'Community Donation Center',
    date = '2026-12-12'
WHERE project_id = 8;

UPDATE projects
SET description = 'Assist older adults with errands, household tasks, and companionship.',
    location = 'Senior Community Center',
    date = '2026-12-19'
WHERE project_id = 9;

SELECT * FROM projects
ORDER BY project_id;
ALTER TABLE public.categories
ADD COLUMN description TEXT;

UPDATE public.categories
SET description = 'Protect and improve the environment through community cleanups, tree planting, and recycling projects.'
WHERE category_id = 1;

UPDATE public.categories
SET description = 'Support learning and personal growth through tutoring, literacy programs, and practical skills workshops.'
WHERE category_id = 2;

UPDATE public.categories
SET description = 'Help people in need through food drives, clothing donations, and assistance for older adults.'
WHERE category_id = 3;

SELECT * FROM public.categories
ORDER BY category_id;
INSERT INTO public.projects
    (project_id, project_name, organization_id, description, location, date)
VALUES
    (
        10,
        'Community Center Repairs',
        1,
        'Repair doors, paint walls, and improve shared spaces at the community center.',
        'Community Center',
        '2026-12-06'
    ),
    (
        11,
        'Accessible Ramp Construction',
        1,
        'Build an access ramp to help people with limited mobility enter a community building.',
        'Neighborhood Resource Center',
        '2026-12-13'
    ),
    (
        12,
        'School Playground Improvements',
        1,
        'Repair benches and improve playground spaces to create a welcoming area for children.',
        'Local Primary School',
        '2026-12-20'
    ),
    (
        13,
        'Community Garden Bed Construction',
        1,
        'Build raised garden beds using sustainable materials for community gardening activities.',
        'Community Garden',
        '2027-01-09'
    ),
    (
        14,
        'Urban Gardening Workshop',
        2,
        'Teach residents how to grow vegetables in small spaces and care for their plants.',
        'Urban Learning Garden',
        '2027-01-16'
    ),
    (
        15,
        'Community Composting',
        2,
        'Help residents turn food scraps and garden waste into compost for local gardens.',
        'Neighborhood Composting Center',
        '2027-01-23'
    );
    INSERT INTO public.project_categories (project_id, category_id)
VALUES
    (1, 1),  -- Community Cleanups: Environmental Care
    (1, 3),  -- Also Community Support
    (2, 1),  -- Tree Planting
    (3, 1),  -- Recycling Projects
    (3, 2),  -- Also Education and Mentoring
    (4, 2),  -- Tutoring
    (5, 2),  -- Literacy Programs
    (6, 2),  -- Teaching Useful Skills
    (7, 3),  -- Food Drives
    (8, 3),  -- Clothing Donations
    (9, 3),  -- Helping Older Adults
    (10, 3), -- Community Center Repairs
    (11, 3), -- Accessible Ramp Construction
    (12, 3), -- School Playground Improvements
    (13, 1), -- Community Garden Bed Construction
    (13, 3), -- Also Community Support
    (14, 1), -- Urban Gardening Workshop
    (14, 2), -- Also Education and Mentoring
    (15, 1), -- Community Composting
    (15, 2)  -- Also Education and Mentoring
ON CONFLICT (project_id, category_id) DO NOTHING;
