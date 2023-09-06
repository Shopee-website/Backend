const { showAllUser } = require("../CRUD/user");

const { showAllReview } = require("../CRUD/feedback");

const { getListProduct } = require("../CRUD/product");

const {
  showUserById,
  updateUserById,
  softDeleteUserById,
} = require("../CRUD/user");

const validators = require(process.cwd() + "/helpers/validators");

async function getAllUser(request, response) {
  try {
    const users = await showAllUser();
    return response.status(200).json({
      message: "Success",
      users: users,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getAllReview(request, response) {
  try {
    const feedbacks = await showAllReview();
    return response.status(200).json({
      message: "Success",
      feedbacks: feedbacks,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getAllProduct(request, response) {
  try {
    const page = Number.parseInt(request.query.page);
    const limit = Number.parseInt(request.query.limit);

    const startIndex = (page - 1) * limit;

    const params = {
      isMall: request.body.isMall ? request.body.isMall : false,
      txt_search: request.body.txt_search ? request.body.txt_search.trim() : "",
      categoryInfo: request.body.categoryInfo
        ? request.body.categoryInfo.trim()
        : "",
      isDiscount: request.body.isDiscount ? request.body.isDiscount : false,
      price_from: request.body.price_from ? request.body.price_from : null,
      price_to: request.body.price_to ? request.body.price_to : null,
      star_from: request.body.star_from ? request.body.star_from : null,
      star_to: request.body.star_to ? request.body.star_to : null,
    };
    const products = await getListProduct(startIndex, limit, params);

    products.rows.forEach((element) => {
      if (element.discount > 0)
        element.price = Math.ceil(
          (element.price * (100 - element.discount)) / 100
        );
    });

    products.count = products.rows.length;
    return response.status(200).json({
      message: "Success",
      products: products,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function updateUserById(request, response) {
  try {
    const userId = request.body.user_id;

    const profile = await showUserById(userId);
    const updateUser = {
      name: request.body.name ? request.body.name : profile.name,
      gender: request.body.gender ? request.body.gender : profile.gender,
      birthday: request.body.birthday
        ? request.body.birthday
        : profile.birthday,
      email: request.body.email ? request.body.email : profile.email,
      telephone: request.body.telephone
        ? request.body.telephone
        : profile.telephone,
      address: request.body.address ? request.body.address : profile.address,
      avatar_url: request.body.avatar_url
        ? request.body.avatar_url
        : profile.avatar_url,
      isAdmin: request.body.isAdmin ? request.body.isAdmin : profile.isAdmin,
    };

    const validateResponse = validators.validateUser(updateUser);
    if (validateResponse !== true) {
      return response.status(400).json({
        message: "Validation failed!",
        errors: validateResponse,
      });
    }
    updateUserById(updateUser, userId).then(() =>
      response.status(200).json({
        message: "Update user successfull !",
      })
    );
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function deleteUserById(request, response) {
  try {
    const user = await showUserById(request.body.user_id);
    if (!user) {
      return response.status(403).json({ message: "Can't find this user" });
    }
    if (user.deletedAt) {
      return response
        .status(404)
        .json({ message: "This user has been deleted" });
    }
    softDeleteUserById(request.body.user_id)
      .then(() => {
        return response.status(200).json({
          message: "Delete user successfully!",
        });
      })
      .catch((error) => {
        return response.status(401).json({
          message: "Delete failed!",
          error: error,
        });
      });
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  getAllUser: getAllUser,
  getAllReview: getAllReview,
  getAllProduct: getAllProduct,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
};
