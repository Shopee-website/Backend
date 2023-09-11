const { addNewFeedBack } = require("../CRUD/feedback");
const { getAllByProctId } = require("../CRUD/feedback");
const { showUserBill } = require("../CRUD/user");
const validators = require("../../helpers/validators");
const jwt = require("jsonwebtoken");
async function create(request, response) {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const newFeedBack = {
      user_id: decode.id,
      // user_id: 11,
      product_id: request.body.product_id,
      star: request.body.star,
      parent_id: request.body.parent_id,
      content: request.body.content,
    };

    // Validate new feedback's data
    const validateResponse = validators.validateFeedBack(newFeedBack);
    if (validateResponse !== true) {
      return response.status(400).json({
        message: "Validation failed!",
        errors: validateResponse,
      });
    }

    const userBill = await showUserBill(decode.id);
    // console.log(userBill.Bills[0].BillDetails[0].ProductDetail.Product);
    let hasMatchingProduct = false;
    for (const bill of userBill.Bills) {
      for (const billDetail of bill.BillDetails) {
        if (billDetail.ProductDetail.Product.id === newFeedBack.product_id) {
          hasMatchingProduct = true;
          break; // Nếu tìm thấy sự trùng khớp, bạn có thể thoát ra khỏi vòng lặp để tiết kiệm thời gian
        }
      }

      if (hasMatchingProduct) {
        break; // Nếu tìm thấy sự trùng khớp trong BillDetails, bạn có thể thoát ra khỏi vòng lặp tổng cộng
      }
    }

    if (hasMatchingProduct) {
      addNewFeedBack(newFeedBack)
        .then(() => {
          return response.status(200).json({
            message: "Create feedback successfully!",
          });
        })
        .catch(() => {
          return response.status(401).json({
            message: "Create feedback fail!",
          });
        });
    } else {
      return response.status(402).json({
        message: "User has not purchased this product!",
      });
    }

    // Add new feedback to database
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getByProctId(request, response) {
  try {
    const productId = request.params.productId;
    const feedback = await getAllByProctId(productId);

    if (feedback.length === 0) {
      return response
        .status(201)
        .json({ message: "This product have no feedback", feedback: feedback });
    }

    response.status(200).json({ message: "Success", feedback: feedback });
  } catch (error) {
    response.status(400).json({ message: "Get data error: " + error });
  }
}

module.exports = {
  getByProctId: getByProctId,
  create: create,
};
