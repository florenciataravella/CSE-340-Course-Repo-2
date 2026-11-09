
import { getAllProjects } from '../models/projects.js';
import{ getProjectDetails } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import {getCategoriesByProjectId} from '../models/categories.js';

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




export { showProjectsPage, showProjectDetailsPage };
