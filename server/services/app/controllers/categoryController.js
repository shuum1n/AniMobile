const { Category } = require('../models');

class CategoryController
{
    static async fetchCategories(req, res, next)
    {
        try
        {
            const categories = await Category.findAll()
            res.status(200).json(categories)
        } catch (error)
        {
            next(error)
        }
    }
    static async createCategory(req, res, next)
    {
        try
        {
            const { name } = req.body;
            const newCategory = await Category.create({
                name: name
            })
            res.status(201).json(newCategory)
        } catch (error)
        {
            next(error)
        }
    }
    static async updateCategory(req, res, next)
    {
        try
        {
            const { id } = req.params;
            const category = await Category.findByPk(id)
            const { name } = req.body;
            category.name = name;
            await category.save()
            res.status(200).json({
                message: "Category updated"
            })
        } catch (error)
        {
            next(error)
        }
    }
    static async deleteCategory(req, res, next)
    {
        try
        {
            const { id } = req.params;
            const category = await Category.findByPk(id)
            await category.destroy()
            res.status(200).json({
                message: "Category destroyed"
            })
        } catch (error)
        {
            next(error)
        }
    }
}

module.exports = CategoryController