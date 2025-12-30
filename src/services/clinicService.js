
import { where } from "sequelize";
import db from "../models/index.js"
let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.image,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
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


let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
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
let getDetailClinicByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {



                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name', 'address'],
                })

                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })


                    data.doctorClinic = doctorClinic
                } else {
                    data = {}
                }
                resolve({
                    errMessage: 'OK',
                    errCode: 0,
                    data
                })


            }
        } catch (e) {
            reject(e)
        }
    })
}
export default {

    createClinicService,
    getAllClinicService,
    getDetailClinicByIdService


}