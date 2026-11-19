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
        p.project_id,
        p.project_name
    FROM public.categories c
    LEFT JOIN public.project_categories pc
    ON c.category_id = pc.category_id
    LEFT JOIN public.projects p
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
        projects: result.rows
        .filter(row => row.project_id) // Filter out rows where project_id is null
        .map(row => ({
            project_id: row.project_id,
            project_name: row.project_name,
        }))
    };
};
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
    const assignCategoryToProject = async (projectId, categoryId) => {
        const query = `
          INSERT INTO public.project_categories (project_id, category_id)
            VALUES ($1, $2)
            ON CONFLICT (project_id, category_id) DO NOTHING;`;
        const queryParams = [projectId, categoryId];
        await db.query(query, queryParams);
    };
    const updateCategoryAssignments= async (projectId, categoryIds) => {
        // First, delete existing category assignments for the project
        const deleteQuery = `
          DELETE FROM public.project_categories
          WHERE project_id = $1;`;
        const deleteQueryParams = [projectId];
        await db.query(deleteQuery, deleteQueryParams);

        // Then, insert the new category assignments
        for (const categoryId of categoryIds) {
            await assignCategoryToProject(projectId, categoryId);
        }
    };
    const createCategory = async (name, description) => {
        const query = `
          INSERT INTO public.categories (category_name, description)
          VALUES ($1, $2)
          RETURNING category_id;`;
        const queryParams = [name, description];
        const result = await db.query(query, queryParams);
        if (result.rows.length === 0) {
            throw new Error('Failed to create category');
        }
        return result.rows[0].category_id;
    };
    const updateCategory = async (categoryId, name, description) => {
        const query = `
          UPDATE public.categories
            SET category_name = $1,
            description = $2
            WHERE category_id = $3
            RETURNING category_id;`
            const queryParams = [name, description, categoryId];
        const result = await db.query(query, queryParams);
        if (result.rows.length === 0) {
            throw new Error('Failed to update category');
        }
        return result.rows[0].category_id;
    };


export {getAllCategories, getCategoryDetails, getCategoriesByProjectId, assignCategoryToProject, updateCategoryAssignments, createCategory, updateCategory};
