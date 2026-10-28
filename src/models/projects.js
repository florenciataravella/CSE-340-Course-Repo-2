import db from './db.js'

const getAllProjects = async() => {
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
    ON p.organization_id = o.organization_id;`

    const result= await db.query(query);
    return result.rows;
}
export {getAllProjects};