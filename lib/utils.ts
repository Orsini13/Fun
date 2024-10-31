// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const authFormSchema = (type: string) =>
//   z.object({
//     // sign up
//     firstName: type === 'sign-in' ? z.string().optional() : z.string().max(20),
//     lastName: type === 'sign-in' ? z.string().optional() : z.string().max(20),
//     address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
//     city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
//     state:
//       type === 'sign-in' ? z.string().optional() : z.string().min(2).max(3),
//     postalCode:
//       type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
//     dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
//     ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
//     // both
//     email: z.string().email(),
//     password: z.string().min(8),
//   })