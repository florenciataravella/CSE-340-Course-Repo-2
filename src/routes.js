import express from 'express';
import {showHomePage} from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { showTestErrorPage } from './controllers/errors.js';
import {showOrganizationDetailsPage} from './controllers/organizations.js';
import {showProjectDetailsPage} from './controllers/projects.js';
import {showCategoryDetailsPage} from './controllers/categories.js';
import {showNewOrganizationForm} from './controllers/organizations.js';
import {processNewOrganizationForm} from './controllers/organizations.js';
import {organizationValidation} from './controllers/organizations.js';
import {showEditOrganizationForm} from './controllers/organizations.js';
import {processEditOrganizationForm} from './controllers/organizations.js';
import {processNewProjectForm} from './controllers/projects.js';
import {showNewProjectForm} from './controllers/projects.js';
import {projectValidation} from './controllers/projects.js';
import {showAssignCategoryForm} from './controllers/categories.js';
import {processAssignCategoriesForm} from './controllers/categories.js';
import {showEditProjectForm} from './controllers/projects.js';
import {processEditProjectForm} from './controllers/projects.js';
import {showEditCategoryForm} from './controllers/categories.js';
import {processEditCategoryForm} from './controllers/categories.js';
import {showNewCategoryForm} from './controllers/categories.js';
import {processNewCategoryForm} from './controllers/categories.js';
import {categoryValidation} from './controllers/categories.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/test-error', showTestErrorPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm); 
router.get('/assign-categories/:projectId', showAssignCategoryForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);


export default router;
