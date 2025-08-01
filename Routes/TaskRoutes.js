const express = require("express");
const { GetAllTask, createTask, updateTask, deleteTask, GetSingleTask, updateSingleTask, DeleteSingleTask } = require("../controllers/taskController");

const router =  express.Router();
router.get("/", GetAllTask);

router.get("/:id", GetSingleTask);

router.put("/:id", updateSingleTask);

router.delete("/:id", DeleteSingleTask);



router.post("/", createTask );

// router.put("/",updateTask);

// router.delete("/",deleteTask);
module.exports = router;
// export default router