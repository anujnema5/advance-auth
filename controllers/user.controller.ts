import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { userPasswordSchema, usersSchema } from "../utils/validation";
import { db } from "../db";
import { users } from "../db/schema";
import { eq, or, sql } from "drizzle-orm";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { generateAccessRefreshToken } from "../utils/tokenUtils";

//For env File 
dotenv.config();

export const signinUser = async (req: Request, res: Response) => {
    try {

        const { username, email, password } = req.body;

        if (!username && !email) {
            return res.status(400).json({ message: "Username or email is required" })
        }

        const foundeUser = await db.query.users.findFirst({
            where: eq(users.username, username),
        }) as any


        const isPasswordCorrect = await bcrypt.compare(password, foundeUser?.password as string)        

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "You've entered wrong password" })
        }
        
        // console.log("I am triggering here also");
        const { accessToken, refreshToken } = await generateAccessRefreshToken(foundeUser.id) as any
        // console.log({accessToken, refreshToken});
        

        const options = {
            httpOnly: true,
            secure: true
        }


        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ accessToken, refreshToken })


    } catch (error) {
        return res.status(200).json(error)

    }
}

export const signUpUser = async (req: Request, res: Response) => {
    try {
        const { username, email, fullName, password } = usersSchema.parse(req.body);

        const existedUser = await db.select()
            .from(users)
            .where(or(eq(users.email, email), eq(users.username, username)))

        if (existedUser.length > 0) {
            return res.status(409).send("User already exists");
        }

        else {

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await db.insert(users).values({
                email,
                fullName,
                password: hashedPassword,
                username
            }).returning({ id: users.id, username: users.username, email: users.email, fullName: users.fullName })


            return res.status(200).json({ message: 'User created successfully', user: newUser });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Validation failed', errors: error });
    }
}

export const accessRefershToken = async (req: Request, res: Response) => {
    const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingrefreshToken) {
        return res.status(401).json({ message: "No refresh token found" })
    }

    try {
        const decodedToken = jwt.decode(incomingrefreshToken) as any

        if (!decodedToken) {
            return res.status(401).json({ message: "non-valid refresh token" })
        }

        const foundUser = await db.query.users.findFirst({
            where: eq(users.id, decodedToken.userId),
            columns: {
                password: false
            }
        })

        if (foundUser?.refreshToken !== incomingrefreshToken) {
            return res.status(401).json({ message: "Token expired or already been used" })
        }

        const { accessToken, refreshToken } = await generateAccessRefreshToken(foundUser?.id) as any

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ accessToken, refreshToken: refreshToken, message: "Accesstoken refreshed" })

    } catch (error) {
        return res.status(401).json({ message: "non-valid refresh token", error })
    }
}