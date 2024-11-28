import { Client,Account,ID } from "appwrite";
import config from "../config/config.js";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        this.client.setProject(config.appwriteProjectId)
        this.account=new Account(this.client);
    }

    async createAccount ({email,password,name}){
        try{
           const userAccount= await this.account.create(ID.unique, email,password,name);
                login(email,password)
           return userAccount;
        }
        catch(err){
            console.log("App write error:: createAccount::", err);
        }
    }

    async login(email,password){
        try{
           return await this.account.createEmailPasswordSession(email,password)
        }
        catch(err){
            console.log("App write error:: login::", err);
        }
    }
    async getCurrentUser(){
        try{
            await this.account.get()
        }
        catch(err){
            console.log("App write error:: getCurrentUser::", err);
        }
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