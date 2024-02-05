import { eq } from "drizzle-orm"
import { db } from "../db"
import { users } from "../db/schema"
import jwt from 'jsonwebtoken'

export const generateAccessRefreshToken = async (id: any) => {
    try {
        
        const user = await db.query.users.findFirst({
            where: eq(users.id, id),
            columns: {
                password: false
            }
        }) as any                

        const accessToken = generateAccessToken(user);        
        const refreshToken = generateRefreshToken(user?.id)

        await db.update(users).set({refreshToken}).where(eq(users.id, user.id))
        return {accessToken, refreshToken}


    } catch (error) {

    }
}

export const generateAccessToken = (user: any) => {
    const accessToken = jwt.sign(
        {
            userId: user?.id,
            email: user?.email,
            username: user?.username,
            fullname: user?.fullName
        },
        process.env.ACCESS_TOKEN_SECRET as string,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })

    return accessToken
}

export const generateRefreshToken = (userID: any) => {
    
    const refreshToken = jwt.sign(
        {
            userId: userID,
        },
        process.env.REFRESH_TOKEN_SECRET as string,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })      
        
        console.log("Token refreshed");
        

    return refreshToken
}


// export const 