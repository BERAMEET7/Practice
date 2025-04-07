const express= require("express");
const router = express.Router();
const {userSignup, userLogin ,deleteUser, getAllUser} = require("../controllers/user.controller");

router.post("/signup" , userSignup);
router.post("/login",userLogin);
router.get("/",getAllUser)
router.delete("/:userID",deleteUser);

module.exports = router;