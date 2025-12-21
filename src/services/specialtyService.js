
import db from "../models/index.js"
let createSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.image,
                    descriptonHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: "Ok"
                })
            };
        }
        catch (e) {
            reject(e)
        }
    })
}


let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            resolve({
                errMessage: 'OK',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}
export default {

    createSpecialtyService,
    getAllSpecialtyService


}