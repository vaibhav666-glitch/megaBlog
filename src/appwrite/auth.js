import { Client,Account,ID } from "appwrite";
import config from "../config/config.js";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount ({email,password,name}){
        try{
           const userAccount= await this.account.create(ID.unique(), email,password,name);
           if (userAccount) {
            // call another method
            return this.login({email, password});
        } else {
           return  userAccount;
        }
        }
        catch(err){
            console.log("App write error:: createAccount::", err);
        }
    }

    async login({email,password}){
        try{
           return await this.account.createEmailPasswordSession(email,password)
        }
        catch(err){
            //throw err;
            console.log("App write error:: login::", err);
            throw err;
        }
    }
    async getCurrentUser(){
        try{
           return await this.account.get()
        }
        catch(err){
            console.log("App write error:: getCurrentUser::", err);
        }
        return null;
    }
    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(err){
            console.log("App write error:: logout::", err);
        }
    }
}

const authService=new AuthService();
export default authService;