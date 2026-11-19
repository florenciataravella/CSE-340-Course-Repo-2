import { getAllCategories } from '../models/categories.js';
import { getCategoryDetails } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { updateCategoryAssignments } from '../models/categories.js'; 
import { updateCategory } from '../models/categories.js';
import { createCategory } from '../models/categories.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 150 })
];

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Categories';
  res.render('categories', { title, categories });
}

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const title = 'Category Details';
    res.render('category', {title, categoryDetails});
}   
const showAssignCategoryForm = async (req, res) => {
  const projectId= req.params.projectId;
  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);
  const title = 'Assign Categories to Project';
  res.render('assign-categories', { title, projectDetails, categories, assignedCategories });
};
const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || []; // Assuming the form sends an array of selected category IDs
  await updateCategoryAssignments(projectId, selectedCategoryIds);
  req.flash('success', 'Categories assigned successfully!');
  res.redirect(`/project/${projectId}`);
};
const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const categoryDetails = await getCategoryDetails(categoryId);
  const title = 'Edit Category';
  res.render('edit-category', { title, categoryDetails });
};
const processEditCategoryForm = async (req, res) => {
  const results = validationResult(req);
  const categoryId = req.params.id;
  const { name, description } = req.body;

  if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
      req.flash('error', error.msg);
    });
    return res.redirect(`/edit-category/${categoryId}`);
  }
  await updateCategory(categoryId, name, description);
  req.flash('success', 'Category updated successfully!');
  res.redirect(`/category/${categoryId}`);
};
const showNewCategoryForm = async (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
};
const processNewCategoryForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
      req.flash('error', error.msg);
    });
    return res.redirect('/new-category');
  }
  try{
    const { name, description } = req.body;
    const categoryId = await createCategory(name, description);
    req.flash('success', 'Category created successfully!');
    res.redirect(`/category/${categoryId}`);
  }
  catch (error) {
    console.error('Error creating category:', error);
    req.flash('error', 'Failed to create category. Please try again.');
    res.redirect('/new-category');
  };
};
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoryForm, processAssignCategoriesForm, showEditCategoryForm, processEditCategoryForm, showNewCategoryForm, processNewCategoryForm, categoryValidation };
