import config from "../config/config";
import { Client, Account , ID } from 'appwrite';
 
export class Authservice{
    client = new Client();
    Account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID)
        this.Account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.Account(ID,email,password,name);
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.Account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            await this.Account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            await this.Account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authservice = new Authservice();

export default authservice;