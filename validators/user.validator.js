import { body } from "express-validator";

export const updateBalanceValidator = [
  body("userId").isInt({ min: 1 }).withMessage("Invalid userId"),
  body("amount").isInt().withMessage("Amount must be an integer"),
];
