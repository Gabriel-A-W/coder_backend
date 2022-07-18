import * as session from "express-session"; 
import { IUserData } from "../IUserData.js";

export default session;

declare module "express-session" {
    interface SessionData {
        userData: IUserData;
    }
}