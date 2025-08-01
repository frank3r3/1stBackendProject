const express = require("express");
const { RegisterUser, GetAllUser, Login, } = require("../Controllers/Usercontroller");

const router =  express.Router();




router.post("/", RegisterUser );
router.get("/", GetAllUser);
router.post("/login", Login);


// router.put("/",updateTask);

// router.delete("/",deleteTask);
module.exports = router;
// export default router