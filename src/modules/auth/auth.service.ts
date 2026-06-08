import config from "../../config";
import { pool } from "../../db";
import type { ILogin, IUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signupIntoDB = async (payload: IUser) => {
    const { name, email, password, role } = payload;
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(`
        INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4, 'contributor')) RETURNING *
        `, [name, email, hashPassword, role])

    delete result.rows[0].password;

    return result;
}

const loginIntoDB = async (payload: ILogin) => {
    const { email, password } = payload;

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])
    if (!userData.rowCount) {
        throw new Error("Invalid Credentials!");
    }

    const user = userData.rows[0];
    const matchedPassword = bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new Error("Invalid Credentials!");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayload, config.access_token_secret as string, {
        expiresIn: config.access_token_expires_in as any
    })

    delete user.password;

    return { accessToken, user };

}

export const authService = {
    signupIntoDB,
    loginIntoDB
}