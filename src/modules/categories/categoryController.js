import Category from '../../../config/models/category.js';
import { catchError } from '../../middleware/catchError.js';

// GET /categories
export const getCategories =catchError(async (req, res, next) => { {
    const categories = await Category.find({ user: req.user._id });
    res.status(200).json(categories);
  }
});
// POST /categories
export const createCategory =catchError (async (req, res, next) => {
  const { name } = req.body;
  {
    const category = new Category({ name, user: req.user._id });
    await category.save();
    res.status(201).json(category);
  }
});

// PUT /categories/:id
export const updateCategory =catchError (async (req, res, next) => {
  {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    category.name = req.body.name || category.name;
    await category.save();
    res.status(200).json(category);
  }
});

// DELETE /categories/:id
export const deleteCategory =catchError ( async (req, res, next) => {
   {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully' });
  }
});
