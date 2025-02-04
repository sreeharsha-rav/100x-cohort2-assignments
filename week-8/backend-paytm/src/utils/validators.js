const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const depositSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be positive")
    .gte(0.01, "Amount must be at least 0.01"),
  description: z
    .string()
    .max(255, "Description must be at most 255 characters")
    .optional(),
});

const transferSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be positive")
    .gte(0.01, "Amount must be at least 0.01"),
  recipientEmail: z.string().email("Invalid email address"),
  description: z
    .string()
    .max(255, "Description must be at most 255 characters")
    .optional(),
});

const withdrawSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be positive")
    .gte(0.01, "Amount must be at least 0.01"),
});

module.exports = {
  registerSchema,
  loginSchema,
  depositSchema,
  transferSchema,
  withdrawSchema,
};
