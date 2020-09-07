const Category = require("../models/category");

// Middleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    req.category = category;
    next();
  });
};

// Methods
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, item) => {
    if (err) {
      return res.status(400).json({
        error: "not able to save category",
      });
    }
    return res.json(item);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "No category Found",
      });
    }
    return res.json(items);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    return res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    return res.json({
      message: "Deletion Successfull",
    });
  });
};
