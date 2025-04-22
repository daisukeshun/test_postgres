import { validationResult } from "express-validator";
import { updateBalance } from "../services/user.service.js";

export const updateBalanceController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { userId, amount } = req.body;
  const result = await updateBalance(userId, amount);
  res.json(result);
};
