import express from "express";
import {
  addStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  pendingAmountList,
  totalAmountPaidList
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", getAllStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

// Features
router.get("/pending/list", pendingAmountList);
router.get("/paid/list", totalAmountPaidList);

export default router;