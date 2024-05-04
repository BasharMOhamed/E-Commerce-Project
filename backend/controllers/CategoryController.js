import asyncHandler from "../middlewares/asyncHandler.js";
import category from "../models/CategoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ Message: "Name is required" });
    }
    const existingCategory = await category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ Message: "This Name already existS" });
    }

    const NewCategory = new category({ name });

    await NewCategory.save();
    res.status(200).json({
      name: NewCategory.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ Error: error.Message });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const Category = await category.findById(req.params.id);
  const { name } = req.body;
  if (Category) {
    Category.name = name || Category.name;
    await Category.save();
    res.status(200).json(Category);
  } else {
    res.status(404);
    throw new Error("This Category doesn't exist");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const Category = await category.findById(req.params.id);
  if (Category) {
    try {
      await category.deleteOne({ _id: Category._id });
      res.status(200).json({ Message: "Category Deleted Successfully" });
    } catch (error) {
      res.status(500);
      throw new Error("Server error");
    }
  } else {
    res.status(404);
    throw new Error("This Category doesn't exist");
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(404);
    throw new Error("Category doesn't exist");
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const Category = await category.findById(req.params.id);
  if (Category) {
    res.status(200).json(Category);
  } else {
    res.status(404);
    throw new Error("Category doesn't exist");
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
};
