const express = require("express");
const personalTransactionController = require("../controllers/personal-transaction");
const {
  addGroupTransaction,
  userAmountData,
  addGroup,
  getGroupTransactions,
  settleUp,
  expenseReportData,
} = require("../controllers/group-transaction");
const userController = require("../controllers/userController");
const user = require("../controllers/user");
const userFriendsController = require("../controllers/user-friends");
const groupDetailsController = require("../controllers/group-details");
const { addContactUsRecord } = require("../controllers/contact");

const router = express.Router();

router.route("/users/register").post(userController.register);

router.route("/users/login").post(userController.login);
router
  .route("/users/requestPasswordReset")
  .post(userController.requestPasswordReset);
router
  .route("/users/verifyPasswordResetOTP")
  .post(userController.verifyPasswordResetOTP);
router.route("/users/updatePassword").post(userController.updatePassword);
// router.route("/addData").post(addData);
// router.route("/findData").get(findData);
router
  .route("/personalTransaction/add")
  .post(personalTransactionController.addPersonalTransaction);
router
  .route("/personalTransaction/:transactionId")
  .get(personalTransactionController.getPersonalTransaction);
router
  .route("/personalTransactions")
  .post(personalTransactionController.getPersonalTransactions);
router
  .route("/personalTransaction/update/:transactionId")
  .put(personalTransactionController.updatePersonalTransaction);
router
  .route("/personalTransaction/delete/:transactionId")
  .delete(personalTransactionController.deletePersonalTransaction);
router.route("/userdetails").post(user.userdetails);
router.route("/getusers").get(user.getusers);
router.route("/addfriend").post(user.addfriend);

router.route("/addGroup").post(addGroup);
router.route("/addGroupTransaction").post(addGroupTransaction);
router.route("/userAmountData/:userId").get(userAmountData);
router.route("/users/getFriends").post(userFriendsController.getFriends);
router.route("/settleUp").post(settleUp);
router.route("/expenseReportData").post(expenseReportData);

router.route("/groups/:userId").get(groupDetailsController.getGroupDetails);
router.route("/getGroups/:id").get(groupDetailsController.getGroups);
router.route("/getGroupTransactions/:id").get(getGroupTransactions);

router.route("/addContactUsRecord").post(addContactUsRecord);
module.exports = router;
