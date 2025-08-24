import db from "../models/index.js"
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) =>{
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    where: {email: email},
                    raw: true,
                })
                if(user){
                    let check  = await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;

                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                    
                }else{
                    userData.errCode = 2;
                    userData.errMessage ='User is not found'
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = 'Your Email is not exist in your system'
                resolve(userData)
                
            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) =>{
    return new Promise (async(resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            }) 
            if(user){
                resolve(true)
            }else { 
                resolve(false)
            }
        }catch(e){
            reject(e);
        }
    })
}

export default{
    handleUserLogin,
    checkUserEmail
}