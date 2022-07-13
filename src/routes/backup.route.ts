import { ProductsAttribute } from "../database/models/ProductsAttributes.model"
import authenticateToken from "../middleware/authenticateToken.middleware"
import { CommonRoutesConfig } from "../common/common.routes.config"
import { Connections } from "../database/models/Connections.model"
import { Categories } from "../database/models/Categories.model"
import { Suppliers } from "../database/models/Suppliers.model"
import { Products } from "../database/models/Products.model"
import { Shops } from "../database/models/Shops.model"
import { User } from "../database/models/Users.model"
import express from "express"

export class Backup extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "backup")
        this.configureRoutes()
    }
    configureRoutes(): express.Application {
        this.app.post("/backup", authenticateToken, async (req: any, res: any) => {
            let params = req.body
            let owner: any = await Connections.findOne({ where: { user_id: req.user.id } })
            owner = owner ? owner.working_under_user_id : req.user.id
            if (params.method === "get") {
                let categories = await Categories.findAll({ where: { user_id: owner } })
                let suppliers = await Suppliers.findAll({ where: { user_id: owner } })
                let products = await Products.findAll({ where: { user_id: owner } })
                let shops = await Shops.findAll({ where: { user_id: owner } })
                let productsAttributes = await ProductsAttribute.findAll({ where: { user_id: owner } })
                return res.status(200).send({
                    categories,
                    suppliers,
                    products,
                    shops,
                    productsAttributes,
                })
            } else if (params.method === "take") {
                if (params.table === "categories") {
                    const backUpCategories = () => {
                        params.data.map(async (category: any, index: number) => {
                            await Categories.create({
                                user_id: owner,
                                name: category.name,
                                picture: category.picture,
                            }).catch(err => {
                                console.log(err)
                            })
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Categories successfully taken",
                                })
                            }
                        })
                    }
                    let categories = await Categories.findAll({ where: { user_id: owner } })
                    if (categories.length == 0) return backUpCategories()
                    categories.map(async (category: any, index: number) => {
                        await category.destroy()
                        if (index === categories.length - 1) {
                            backUpCategories()
                        }
                    })


                } else if (params.table === "suppliers") {
                    const backUpSuppliers = () => {
                        params.data.map(async (supplier: any, index: number) => {
                            await Suppliers.create({
                                user_id: owner,
                                name: supplier.name,
                                picture: supplier.picture,
                            })
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Suppliers successfully taken",
                                })
                            }
                        })
                    }
                    let suppliers = await Suppliers.findAll({ where: { user_id: owner } })
                    if (suppliers.length == 0) return backUpSuppliers()
                    suppliers.map(async (supplier: any, index: number) => {
                        await supplier.destroy()
                        if (index === suppliers.length - 1) {
                            backUpSuppliers()
                        }
                    })

                } else if (params.table === "products") {
                    const backUpProducts = () => {
                        params.data.map(async (product: any, index: number) => {
                            await Products.create({
                                user_id: owner,
                                product_id: product.product_id,
                                name: product.name,
                                picture: product.picture,
                                description: product.description,
                                qr_code: product.qr_code,
                                category: product.category,
                                supplier: product.supplier,
                            })
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Products successfully taken",
                                })
                            }
                        })
                    }
                    let products = await Products.findAll({ where: { user_id: owner } })
                    if (products.length == 0) return backUpProducts()
                    products.map(async (product: any, index: number) => {
                        await product.destroy()
                        if (index === products.length - 1) {
                            backUpProducts()
                        }
                    })

                } else if (params.table === "products_attributes") {
                    const backUpProductsAttributes = () => {
                        params.data.map(async (productAttribute: any, index: number) => {
                            await ProductsAttribute.create({
                                user_id: owner,
                                product_id: productAttribute.product_id,
                                number: productAttribute.number,
                                metric: productAttribute.metric,
                                cost_price: productAttribute.cost_price,
                                price: productAttribute.price,
                            })
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Products attributes successfully taken",
                                })
                            }
                        })
                    }
                    let productsAttributes = await ProductsAttribute.findAll({ where: { user_id: owner } })
                    if (productsAttributes.length == 0) return backUpProductsAttributes()
                    productsAttributes.map(async (productAttribute: any, index: number) => {
                        await productAttribute.destroy()
                        if (index === productsAttributes.length - 1) {
                            backUpProductsAttributes()
                        }
                    })

                } else if (params.table === "shops") {
                    const backUpShops = () => {
                        params.data.map(async (shop: any, index: number) => {
                            await Shops.create({
                                user_id: owner,
                                shop_id: shop.shop_id,
                                name: shop.name,
                                address: shop.address,
                                phone: shop.phone,
                                picture: shop.picture,
                                qr_code: shop.qr_code,
                            })
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Shops successfully taken",
                                })
                            }
                        })
                    }
                    let shops = await Shops.findAll({ where: { user_id: owner } })
                    if (shops.length == 0) return backUpShops()
                    shops.map(async (shop: any, index: number) => {
                        await shop.destroy()
                        if (index === shops.length - 1) {
                            backUpShops()
                        }
                    })

                } else {
                    return res.status(200).send({
                        message: "No table selected",
                    })
                }
            } else {
                return res.status(400).send({ message: "method not found", code: 400 })
            }
        })
        return this.app
    }
}
