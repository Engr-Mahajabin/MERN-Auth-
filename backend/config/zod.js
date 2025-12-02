import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, "Name must be atleast 4 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "password must be atleast 5 characters long"),
});
