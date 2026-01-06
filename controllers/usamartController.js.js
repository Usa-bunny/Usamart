const Item = require('../models/itemModel');
const Category = require('../models/categoryModel');
const handleError = require('../utils/handleError');
const cloudinary = require('cloudinary').v2;

const usamartController = {
    getCategory: async (req, res) => {
        try {
            const category = await Category.find();
            res.render('category', { category });
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    addCategory: async (req, res) => {
        try {
            const { category_name } = req.body;
            const category = new Category({ category_name });
            await category.save();
            res.redirect('/usamart/category');
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    editCategory: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id);

            const categoryData = await Category.findById(id);
            const { category_name } = req.body;
            await Category.findByIdAndUpdate(id, { category_name: category_name || categoryData.category_name });
            res.redirect('/usamart/category');
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            await Category.findByIdAndDelete(id);
            res.redirect('/usamart/category');
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    getAllItem: async (req, res) => {
        try {
            const item = await Item.find().populate('id_category');
            const category = await Category.find();

            res.render('item', { item, category });
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    addItem: async (req, res) => {
        try {
            const { id_category, item_name, item_price, item_stock, item_detail } = req.body;

            const imageUrl = req.file ? req.file.path : null;
            const imagePublicId = req.file ? req.file.filename : null;

            const itemStatus =
                item_stock <= 0 ? "Empty" :
                item_stock < 3 ? "Pre-Order" :
                "Available";

            const newItem = new Item({
                id_category,
                item_name,
                item_image: imageUrl,
                public_id: imagePublicId,
                item_price,
                item_stock,
                item_detail,
                status: itemStatus
            });

            await newItem.save();
            res.redirect('/usamart/item');

        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    editItem: async (req, res) => {
        try {
            const id = req.params.id;
            const existingItem = await Item.findById(id);

            if (!existingItem) {
                return handleError(res, 404, "Item not found");
            }

            const { id_category, item_name, item_price, item_stock, item_detail } = req.body;

            let updatedData = {
                id_category,
                item_name,
                item_price,
                item_stock,
                item_detail
            };

            updatedData.status =
                item_stock <= 0 ? "Empty" :
                item_stock < 3 ? "Pre-Order" :
                "Available";

            if (req.file) {
                if (existingItem.public_id) {
                    await cloudinary.uploader.destroy(existingItem.public_id);
                }

                updatedData.item_image = req.file.path;      
                updatedData.public_id = req.file.filename;   
            }

            await Item.findByIdAndUpdate(id, updatedData);

            return res.redirect('/usamart/item');
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    deleteItem: async (req, res) => {
        try {
            const id = req.params.id;

            const item = await Item.findById(id);
            if (!item) return handleError(res, 404, "Item not found");

            if (item.public_id) {
                await cloudinary.uploader.destroy(item.public_id);
            }

            await Item.findByIdAndDelete(id);

            return res.redirect('/usamart/item');
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    setCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const existingItem = await Item.findById(id);
            if (!existingItem) {
                return handleError(res, 404, "Item not found");
            }
            const { id_category } = req.body;
            await Item.findByIdAndUpdate(
                id, { id_category }
            );
            return res.redirect('/usamart/item');
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    }
};

module.exports = usamartController;
