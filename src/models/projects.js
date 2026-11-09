import db from './db.js'

const getAllProjects = async() => {
    const query=`
    SELECT p.project_id,
        p.project_name,
        p.date
    FROM public.projects p`
    const result= await db.query(query);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query=`
    SELECT p.project_id,
        p.project_name,
        p.organization_id,
        p.description,
        p.location,
        TO_CHAR(p.date, 'MM/DD/YYYY') AS date,
        o.name 
    FROM public.projects p
    JOIN public.organization o
    ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;`

    const queryParams = [id];
    const result= await db.query(query, queryParams);
    return result.rows[0];
};
const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          project_name,
          description,
          location,
          date
        FROM projects
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};


const getUpcomingProjects = async (number_of_projects) => {
    const query = `
    SELECT p.project_id,
        p.project_name,
        p.organization_id,
        p.description,
        p.location,
        TO_CHAR(p.date, 'MM/DD/YYYY') AS date,
        o.name 
    FROM public.projects p
    JOIN public.organization o
    ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;`;

    const queryParams = [number_of_projects];
    const result= await db.query(query, queryParams);
    return result.rows;
};
export {getAllProjects, getProjectsByOrganizationId, getProjectDetails, getUpcomingProjects};