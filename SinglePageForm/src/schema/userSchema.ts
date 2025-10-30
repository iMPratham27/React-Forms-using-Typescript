import { z } from "zod";

// userSchema is a Zod schema object.
export const userSchema = z.object({
    fullName: z.string()
                .trim()
                .min(2, "Full name must be atleast 2 characters"),
    email: z.string()
            .trim()
            .email("Please enter valid email"),
    age: z.coerce.number()
            .int("Age must be number")
            .min(13, "You must be at least 13")
            .max(100, "Please enter realistic number"),
    password: z.string()
                .min(6, "Password must be atleast 6 characters")
                .max(64, "Password must be at most 64 characters"),
});

export type UserSchema = z.infer<typeof userSchema>;
/*
    z.infer<typeof userSchema> :
    extracts the TypeScript type from your Zod schema, 
    so you don’t need to manually write interfaces or worry about mismatches.
*/
  