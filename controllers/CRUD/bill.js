const { Op } = require("sequelize");
const models = require(process.cwd() + "/models");
const { getCurrentDateTime } = require(process.cwd() + "/helpers/datetime");
const objectCleaner = require("../../helpers/object-cleaner");

const include = [
    {
        model: models.BillDetail,
        require: true,
        include: [
            {
                model: models.ProductDetail,
                include: [
                    {
                        model: models.Product,
                        include: [
                            {
                                model: models.ProductImage,
                                attributes: ["image"],
                                required: true,
                            },
                            {
                                model: models.Category,
                                required: true,
                                attributes: ["name"],
                            },
                        ],
                        attributes: ["product_name", "price", "discount"],
                        required: true,
                    },
                ],
                required: true,
                attributes: ["size", "color", "quan_in_stock"],
            },
        ],
    },
];

async function index(startIndex, limit, params)
{
    const selection = objectCleaner.clean({
        recipient_info : params.recipient_info ? { [Op.like]: `%${params.recipient_info}%` } : null,
        user_id : params.user_id ? params.user_id : null,
        payment_method : params.payment_method ? { [Op.like]: `%${params.payment_method}%` } : null,
        transport_method : params.transport_method ? { [Op.like]: `%${params.transport_method}%` } : null,
        book_status : params.book_status ? { [Op.like]: `%${params.book_status}%` } : null,
        ship_status : params.ship_status ? { [Op.like]: `%${params.ship_status}%` } : null,
    });

    const orderBy = [
        ["id", "ASC"],
        ["user_id", "ASC"],
        ["total_price", "DESC"],
    ]
    
    return models.Bill.findAndCountAll(
        objectCleaner.clean({
            include: include,
            offset: Number.isNaN(startIndex) ? null : startIndex,
            limit: Number.isNaN(limit) ? null : limit,
            order: orderBy,
            where: selection,
        })
    );
}

async function showByUserId(userId, startIndex, limit) {
    return models.Bill.findAndCountAll(
        objectCleaner.clean({
            offset: Number.isNaN(startIndex) ? null : startIndex,
            limit: Number.isNaN(limit) ? null : limit,
            where: {
                user_id: userId,
                deletedAt: { [Op.eq]: null },
            },
            include: include,
        })
    );
}

async function showById(id) {
    return models.Bill.findByPk(id, {
        where: {
            deletedAt: { [Op.eq]: null },
        },
    });
}

async function create(newBill) {
    return models.Bill.create(newBill);
}

async function update(updateBill, id) {
    return models.Bill.update(updateBill, { where: { id: id } });
}

async function destroy(id) {
    const now = getCurrentDateTime();

    const updateBill = {
        deletedAt: now,
    };
    await update(updateBill, id);
}

module.exports = {
    getBillById: showById,
    getListBill : index,
    addNewBill: create,
    updateBillById: update,
    softDeleteBillById: destroy,
    getBillByUserId: showByUserId,
};
