import express from "express";
import { updateBalanceController } from "../controllers/user.controller.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { updateBalanceValidator } from "../validators/user.validator.js";

const router = express.Router();

router.post(
  "/update-balance",
  updateBalanceValidator,
  asyncWrapper(updateBalanceController),
);

export default router;
