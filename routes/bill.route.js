const express = require("express");
const billController = require("../controllers/api/bill.controller")
const checkRoleMiddleware = require("../middleware/check-role");

const router = express.Router();

router.get('/all_bill', billController.getByUserId)

router.get('/all_billDetail', billController.getBillDetailByUserId)

router.post('/', billController.addBill)

router.patch('/:id', 
    checkRoleMiddleware.checkRoleAdmin,
    billController.updateBill
)

router.delete('/:id', 
    checkRoleMiddleware.checkRoleAdmin,
    billController.deleteById
)

module.exports = router;