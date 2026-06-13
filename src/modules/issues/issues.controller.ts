import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import type { IIssues, IUser } from "./issues.interface";

const createIssue = async (req: Request, res: Response) => {
    try {
        const user = req.user;
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
        const result = await issuesService.getAllIssuesFromDB();
        res.status(200).json({
            success: true,
            message: "Issue created successfully!",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await issuesService.getSingleIssueFromDB(id as string)
        console.log(result);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "No issue found!",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "Issue retrieved successfully!",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}

const updateIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const payload: IIssues = req.body;
        const result = await issuesService.updateIssueIntoDB(id as string, payload);
        if (!result.rowCount) {
            res.status(404).json({
                success: false,
                message: "No issue found!",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "Issue retrieved successfully!",
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


export const issuesController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue
}