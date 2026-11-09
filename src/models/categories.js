import db from './db.js'

const getAllCategories = async()=>{
    const query=`
    SELECT category_id, 
        category_name,
        description
    FROM public.categories;`
    
    const result = await db.query(query);
    return result.rows;
}

const getCategoryDetails = async (id) => {
    const query=`
    SELECT c.category_id,
        c.category_name,
        c.description,
        pc.project_id,
        pc.category_id,
        p.project_id,
        p.project_name
    FROM public.categories c
    JOIN public.project_categories pc
    ON c.category_id = pc.category_id
    JOIN public.projects p
    ON pc.project_id = p.project_id
    WHERE c.category_id = $1;`

    const queryParams = [id];
    const result = await db.query(query, queryParams);
    if (result.rows.length === 0) {
        return null;
    }
    return {
        category_id: result.rows[0].category_id,
        category_name: result.rows[0].category_name,
        description: result.rows[0].description,
        projects: result.rows.map(row => ({
            project_id: row.project_id,
            project_name: row.project_name,
        }))
        };
    }
    const getCategoriesByProjectId = async (projectId) => {
        const query = `
          SELECT c.category_id,
                 c.category_name,
                 c.description
          FROM public.categories c
          JOIN public.project_categories pc ON c.category_id = pc.category_id
          WHERE pc.project_id = $1;`;
        const queryParams = [projectId];
        const result = await db.query(query, queryParams);
        return result.rows;
    };
export {getAllCategories, getCategoryDetails, getCategoriesByProjectId};

