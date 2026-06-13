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

const getAllIssuesFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM issues
        `)
    const issues = result.rows
    if (issues.length === 0) {
        throw new Error("No Issues Found!");
    }
    const reporter_id = [...new Set(issues.map(issue => issue.reporter_id))]
    const userData = await pool.query(`
        SELECT id,name,role FROM users WHERE id=$1
        `, [result.rows[0].reporter_id])


    return result;
}

const getSingleIssueFromDB = async (id: string) => {
    const result = await pool.query(`
        SELECT * FROM issues WHERE id=$1
        `, [id])
    // console.log(result);
    const userData = await pool.query(`
        SELECT id,name,role FROM users WHERE id=$1
        `, [result.rows[0].reporter_id])
    if (!result.rowCount) {
        throw new Error("No Issue Found!");
    }
    // console.log(userData);
    const reporter = userData.rows[0]
    const issue = result.rows[0]
    delete issue.reporter_id
    // console.log(user);
    return { ...issue, reporter }
}

const updateIssueIntoDB = async (id: string, payload: IIssues) => {
    const { title, description, type } = payload;
    const result = await pool.query(`
        UPDATE issues SET title=COALESCE($1, title),description=COALESCE($2,description),type=COALESCE($3,type) WHERE id=$4 RETURNING *
        `, [title,description,type,id])
    return result;
}

export const issuesService = {
    createIssuesIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueIntoDB
}