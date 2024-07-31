import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { hash } from 'bcryptjs';
import { z } from 'zod';

// Define Schema for Input Validation
const userSchema = z
    .object({
        username: z.string().min(1, "Username Required!").max(20, "Username must be less than 20 characters!"),
        email: z.string().min(1, "Email Required!").email("Invalid Email!"),
        password: z.string().min(1, "Password Required!").min(8, "Password must be at least 8 characters!"),
    });

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // Check if Email Already Exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Email already exists!" }, { status: 409 });
        }

        // Check if Username Already Exists
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });

        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with the Username already exists!" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User Created Successfully!" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went Wrong!" }, { status: 500 });
    }
}
