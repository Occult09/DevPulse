import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
    try {
        const result = await authService.signupIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "User Created Successfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginIntoDB(req.body);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}


export const authController = {
    signup,
    login
}