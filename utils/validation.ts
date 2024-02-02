import { z } from 'zod'

export const usersSchema = z.object({
    username: z.string().max(25, { message: 'Username must be at most 25 characters long' }),
    email: z.string().max(25, { message: 'Email must be at most 25 characters long' }),
    fullName: z.string().min(3, { message: 'Full name is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export const userPasswordSchema = z.object({
    username: z.string().max(25, { message: 'Username must be at most 25 characters long' }).optional(),
    email: z.string().max(25, { message: 'Email must be at most 25 characters long' }).optional(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
}).refine(data => data.email || data.username, {
    message: 'Either email or password must be provided',
});