import config from "../config/config";
import { Client, Databases, Storage, Query , ID } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createpost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Error creating account ", error);
        }

    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Error in update post ",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error in delete post ",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId,slug);
        } catch (error) {
            console.log("Error in getPost ",error);
            return false;
        }
    }

    async getPosts(queries =[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteBucketId,
                queries,
            )
        } catch (error) {
            console.log("Error in getPosts ",error);
            return false;
        }
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Error in uploadFile ",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error in deleteFile ",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;