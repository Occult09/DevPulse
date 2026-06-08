import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), '.env')
});

const config = {
    port: process.env.PORT,
    connection_string: process.env.CONNECTION_STRING,
    access_token_secret: process.env.SECRET,
    access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN
}

export default config;