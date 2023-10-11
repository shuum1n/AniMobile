const { Product, Images, sequelize, Category, User } = require('../models');
const { Op } = require('sequelize');
class ProductController
{
    static async createProduct(req, res, next)
    {
        try
        {
            const result = await sequelize.transaction(async (t) =>
            {
                const { name, description, price, mainImg, userMongoId, CategoryId, image1, image2, image3 } = req.body;
                const AuthorId = 1;
                const slug = name.split(" ").join("-").toLowerCase();
                const newProduct = await Product.create({
                    name,
                    slug,
                    description,
                    userMongoId,    
                    price,
                    mainImg,
                    CategoryId,
                    AuthorId
                }, { transaction: t });

                const imageDatas = [];
                if (image1) imageDatas.push(image1)
                if (image2) imageDatas.push(image2)
                if (image3) imageDatas.push(image3)
                if (imageDatas)
                {
                    await Promise.all(
                        imageDatas.map(async (element) =>
                        {
                            console.log(element)
                            await Images.create({
                                imgUrl: element,
                                ProductId: newProduct.id
                            }, {
                                transaction: t
                            })
                        })
                    )
                }
                return newProduct
            })
            res.status(201).json(result)
        } catch (error)
        {
            next(error)
        }
    }

    static async fetchProducts(req, res, next)
    {
        try
        {
            const options = {
                include: [
                    {
                        model: Images
                    },
                    {
                        model: Category
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'AuthorId']
                }
            }
            const { search } = req.query;
            console.log(search)
            if (search)
            {
                options.where = {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }
            const products = await Product.findAll(options)
            res.status(200).json(products);
        } catch (error)
        {
            next(error)
        }
    }

    static async fetchBySlug(req, res, next)
    {
        try
        {
            const { slug } = req.params;
            const product = await Product.findOne({
                where: {
                    slug: slug
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Images
                    },
                    {
                        model: User
                    },
                    {
                        model: Category
                    }
                ]
            })
            res.status(200).json(product)
        } catch (error)
        {
            next(error)
        }
    }

    static async deleteProduct(req, res, next)
    {
        try
        {
            const { id } = req.params;
            const product = await Product.findByPk(id)
            console.log(product)
            await product.destroy();
            res.status(200).json({
                message: "Product destroyed"
            })
        } catch (error)
        {
            next(error)
        }
    }

    static async editProduct(req, res, next)
    {
        try
        {
            const { id, name, description, price, mainImg, CategoryId } = req.body;
            const slug = name.split(" ").join("-").toLowerCase();
            const product = await Product.findByPk(id);
            product.name = name;
            product.slug = slug;
            product.description = description;
            product.price = price;
            product.mainImg = mainImg;
            product.CategoryId = CategoryId;
            product.AuthorId = 1;
            await product.save()
            res.status(200).json({
                message: "Product edited"
            })
        } catch (error)
        {
            console.log(error)
            next(error)
        }
    }
}

module.exports = ProductController;