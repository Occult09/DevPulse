import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import type { IUser } from "./issues.interface";

const createIssue = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        console.log(user);
        const result = await issuesService.createIssuesIntoDB(req.body, user as IUser);
        res.status(201).json({
            success: true,
            message: "Issue created successfully!",
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

const getAllIssues = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}


export const issuesController = {
    createIssue,
    getAllIssues
}