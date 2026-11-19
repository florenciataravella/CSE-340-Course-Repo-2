
import { getAllProjects } from '../models/projects.js';
import{ getProjectDetails } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import {getCategoriesByProjectId} from '../models/categories.js';
import {createProject} from '../models/projects.js';
import {getAllOrganizations} from '../models/organizations.js';
import {body, validationResult} from 'express-validator';
import { updateProject } from '../models/projects.js';

const projectValidation = [
    body('project_name')
        .trim()
        .notEmpty()
        .withMessage('Project name is required')
        .isLength({ min: 3, max: 100 }) 
        .withMessage('Project name must be between 3 and 100 characters'),
    body('description')
        .trim() 
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 500 })
        .withMessage('Project description cannot exceed 500 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required')
        .isLength({ max: 200 }) 
        .withMessage('Project location cannot exceed 200 characters'),
    body('date')
        .notEmpty()
        .withMessage('Project date is required')
        .isISO8601()
        .withMessage('Please provide a valid date in YYYY-MM-DD format')
];
const number_of_projects = 5;
const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(number_of_projects);
    const title = 'Upcoming Service Projects';
   // console.log("projects:" , projects);
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
  
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';
    res.render('project', {title, projectDetails, categories });
    
}
const showNewProjectForm = async (req, res) => {
    const title = 'Add New Project';
    const organizations = await getAllOrganizations();
    res.render('new-project', { title, organizations });
}
const processNewProjectForm = async (req, res) => {
    const { project_name, organizationId, description, location, date } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });                 //if there are errors, error type messages are stored in the session and will be displayed on the next page render
        res.redirect('/new-project');
        return; // Ensure we don't continue processing after redirect
        
    }
    try {
        const projectId = await createProject(project_name, organizationId, description, location, date);
        req.flash('success', 'Project created successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error creating project:', error);
        req.flash('error', 'Failed to create project. Please try again.');
        res.redirect('/new-project');
    } }
const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title = 'Edit Project';
    res.render('edit-project', { title, projectDetails, organizations });
};
const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const { project_name, organizationId, description, location, date } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect(`/edit-project/${projectId}`);
        return; // Ensure we don't continue processing after redirect
    }
    await updateProject(projectId, project_name, organizationId, description, location, date);
    req.flash('success', 'Project updated successfully!');
    res.redirect(`/project/${projectId}`);
};
export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm};
