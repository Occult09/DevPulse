import { pool } from "../../db"
import type { IIssues, IUser } from "./issues.interface"

const createIssuesIntoDB = async (payload: IIssues, user: IUser) => {
    const { title, description, type } = payload;
    const { id } = user;
    const result = await pool.query(`
        INSERT INTO issues(reporter_id, title, description, type) VALUES($1,$2,$3,$4) RETURNING *
        `, [id, title, description, type]);
    return result;
}

export const issuesService = {
    createIssuesIntoDB
}