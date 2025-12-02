// import { registerSchema } from "../config/zod.js";
// import TryCatch from "../middlewares/TryCatch.js";
// import sanitize from "mongo-sanitize";

// export const registerUser = TryCatch(async (req, res) => {
//   const sanitizedBody = sanitize(req.body);
//   const validation = registerSchema.safeParse(sanitizedBody);

//   if (!validation.success) {
//     const zodError = validation.error;
//     let firstErrorMsg = "validation failed";
//     let allError = [];
//     if (zodError?.issues && Array.isArray(zodError.issues)) {
//       allError = zodError.issues.map((issue) => ({
//         field: issue.path ? issue.path.join(".") : "unknown",
//         message: issue.message || "validation error",
//         code: issue.code,
//       }));
//       firstErrorMsg = allError[0]?.message || "validation error";
//     }

//     return res.status(400).json({
//       message: firstErrorMsg,
//       errors: allError,
//     });
//   }

//   const { name, email, password } = validation.data;
//   // const { name, email, password } = sanitize(req.body);
//   res.json({
//     name,
//     email,
//     password,
//   });
//   console.log(req.body);
// });

import { registerSchema } from "../config/zod.js";
import TryCatch from "../middlewares/TryCatch.js";
import sanitize from "mongo-sanitize";
import User from "../models/User.js";

export const registerUser = TryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);
  const validation = registerSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;
    let firstErrorMsg = "validation failed";
    let allError = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allError = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue.message || "validation error",
        code: issue.code,
      }));
      firstErrorMsg = allError[0]?.message || "validation error";
    }

    return res.status(400).json({
      message: firstErrorMsg,
      errors: allError,
    });
  }

  const { name, email, password } = validation.data;

  // user is saved to database:
  const user = await User.create({
    name,
    email,
    password,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});
