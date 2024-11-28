import config from "../config/config";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl);
        this.client.setProject(config.appwriteProjectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
              config.appwriteDatabaseId,
              config.appwriteCollectionId,
              slug,
              {
                title,
                content,
                featuredImage,
                status,
                userId
              }
            )
        }
        catch(err){
            console.log(err)
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        }
        catch(err){
            console.log(err);
        }
    }

    async deletePost({slug}){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        }
        catch(err){
            console.log(err);
        }
    }
    async getAllPost(queries=[Query.equal("status","active")]){
        try{
            await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries)
        }
        catch(err){
            console.log(err);
            return false
        }
    }

    // file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(err){
            console.log(err);
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch(err)
        {
            console.log(err);
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
const service =new Service();
export default service;