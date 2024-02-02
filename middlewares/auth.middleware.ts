import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";

interface AuthenticatedRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object
}

export const verifyJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken || req.body.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return res.status(401).json({ message: "Unauthorize request" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as any

        const user = await db.query.users.findFirst({
            where: eq(users.id, decodedToken.userId),
            columns: {
                password: false,
                refreshToken: false
            }
        })        

        req.user = user
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({message : "Something went wrong"})
    }
}