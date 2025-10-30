import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schema/userSchema.ts";
import type { User } from "../types/User.ts";


export default function SignupForm() {

    const { 
        register, 
        handleSubmit, 
        formState:{ errors, isSubmitting, }, 
        reset 
    } = useForm({
        resolver: zodResolver(userSchema), // Connect Zod with React Hook Form
        mode: "onTouched", // validate when user leaves input.
        defaultValues: {
            fullName: "",
            email: "",
            age: 18,
            password: "",
        }
    });

    const onSubmit = (data: User) => {
        console.log("Submitted data: ", data);
        reset();
    }

    const inputClass =
        "block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500";
    const errorClass = "mt-1 text-sm text-red-600";

    return (
        <div className="max-w-md mx-auto mt-8 rounded-2xl border p-6 shadow-sm">
            <h1 className="mb-4 text-2xl font-semibold">Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate> 
                {/* noValidate - Turn off browser validation, use only your own validation logic. */}

                {/* Full name */}
                <label className="mb-1 block font-medium" htmlFor="fullName">
                    Full Name
                </label>
                <input 
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    className={inputClass}
                />
                {errors.fullName && (
                    <p className={errorClass}>{errors.fullName.message}</p>
                )}

                {/* Email */}
                <label className="mb-1 mt-4 block font-medium" htmlFor="email">
                    Email
                </label>
                <input 
                    id="email"
                    type="email"
                    {...register("email")}
                    className={inputClass}
                />
                {errors.email &&(
                    <p className={errorClass} >{errors.email.message}</p>
                )}
                
                {/* Age */}
                <label className="mb-1 mt-4 block font-medium" htmlFor="email">
                    Age
                </label>
                <input 
                    id="age"
                    type="number"
                    inputMode="numeric"
                    {...register("age")}
                    className={inputClass}
                />
                {errors.age && (
                    <p className={errorClass}>{errors.age.message}</p>
                )}
                
                {/* Password */}
                <label className="mb-1 mt-4 block font-medium" htmlFor="password">
                    Password
                </label>
                <input 
                    id="password"
                    type="password"
                    {...register("password")}
                    className={inputClass}
                />
                {errors.password && (
                    <p className={errorClass}>{errors.password.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white disabled:opacity-60"
                >
                    {isSubmitting ? "Submitting..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}