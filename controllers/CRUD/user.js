const { Op } = require("sequelize");
const models = require(process.cwd() + "/models");
const { getCurrentDateTime } = require(process.cwd() + "/helpers/datetime");

const include = [
  {
    model: models.Bill,
    require: true,
    include: [
      {
        model: models.BillDetail,
        require: true,
        include: [
          {
            model: models.ProductDetail,
            include: [
              {
                model: models.Product,
                attributes: ["id", "product_name"],
                required: true,
              },
            ],
            required: true,
            attributes: ["size", "color", "quan_in_stock"],
          },
        ],
      },
    ],
  },
];

async function showById(id) {
  return models.User.findByPk(id, { include: include });
}

async function showByEmail(email) {
  return models.User.findOne({
    where: { email: email, deletedAt: { [Op.eq]: null } },
  });
}

async function create(newUser) {
  return models.User.create(newUser);
}

async function update(updateUser, id) {
  return models.User.update(updateUser, { where: { id: id } });
}

async function destroy(id) {
  const now = getCurrentDateTime();

  const updateUser = {
    deletedAt: now,
  };
  await update(updateUser, id);
}

async function showAllUser() {
  return await models.User.findAll({
    where: {
      deletedAt: null,
    },
    attributes: [
      "id",
      "name",
      "gender",
      "birthday",
      "email",
      "telephone",
      "address",
      "avatar_url",
    ],
  });
}

async function showUserById(id) {
  return await models.User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
}

async function showUserBill(id) {
  return models.User.findByPk(id, {
    include: include,
  });
}

module.exports = {
  getUserById: showById,
  getUserByEmail: showByEmail,
  addNewUser: create,
  updateUserById: update,
  softDeleteUserById: destroy,
  showAllUser: showAllUser,
  showUserById: showUserById,
  showUserBill: showUserBill,
};
