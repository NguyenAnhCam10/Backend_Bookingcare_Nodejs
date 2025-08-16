import { rejects } from "assert";
import bcrypt from "bcryptjs";
import { resolve } from "path";
import db from "../models/index.js";
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) =>{
    return new Promise  (async(resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashPasswordFromBcrypt,
                email: data.email,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                
                roleId: data.roleId,
                
            })
            resolve('ok! create  ')
        }catch(e){
            reject(e);
        }
    })
   
    
}

let hashUserPassword = (password) => {
    return new Promise (async(resolve, reject) =>{
        try{
            let hashPassword = await bcrypt.hashSync("password", salt);

            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
        
    // Store hash in your password DB
    })
}

export default {
createNewUser,
}