const { z } = require("zod");

const createVisitorSchema = z.object({
  name: z.string().min(1, "Visitor name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  company: z.string().optional(),
  purpose: z.string().min(1, "Visit purpose is required"),
});

const updateVisitorSchema = z.object({
  name: z.string().min(1, "Visitor name is required").optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  company: z.string().optional(),
  purpose: z.string().min(1, "Visit purpose is required").optional(),
  checkOutTime: z.string().datetime().optional(),
});

module.exports = {
  createVisitorSchema,
  updateVisitorSchema,
};