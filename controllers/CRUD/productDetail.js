const { Op } = require("sequelize");
const models = require(process.cwd() + "/models");
const { getCurrentDateTime } = require(process.cwd() + "/helpers/datetime");
const objectCleaner = require("../../helpers/object-cleaner");

async function showDetailByProductById(ProductId)
{
    return models.ProductDetail.findAndCountAll({
        where: { product_id: ProductId },
        attributes: ['size','color','quan_in_stock'],
    });
}

async function create(newProductDetail) {
    return models.ProductDetail.create(newProductDetail);
}

async function getProductDetailId(productId, color, size)
{
    return models.ProductDetail.findOne({
        where : {
            product_id : { [Op.eq] : productId},
            color : { [Op.eq] : color},
            size : { [Op.eq] : size},
        },
        attributes : ['id'],
    })
}

module.exports = {
    getDetailByProductById : showDetailByProductById,
    addProductDetails : create,
    getProductDetailId : getProductDetailId,
}