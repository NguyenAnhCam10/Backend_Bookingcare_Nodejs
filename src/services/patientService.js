import { where } from "sequelize"
import db from "../models/index.js"
import { resolve } from "path"
import { rejects } from "assert"
import dotenv from 'dotenv'
dotenv.config()
import _ from 'lodash';
import emailService from "./emailService.js"


// let postBookAppoinmentService = async (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // console.log('=== CHECK DATA BACKEND ===');
//             // console.log(data);
//             // console.log('email:', data.email);
//             // console.log('doctorId:', data.doctorId);
//             // console.log('timeType:', data.timeType);
//             // console.log('date:', data.date);
//             // console.log('typeof date:', typeof data.date);
//             // console.log('==========================');
//             if (!data.email || !data.doctorId || !data.timeType || !data.date) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing required parameter'
//                 })
//             } else {
//                 let user = await db.User.findOrCreate({
//                     where: { email: data.email },
//                     defaults: {
//                         email: data.email,
//                         roleId: 'R3'
//                     }
//                 });
//                 if (user && user[0]) {
//                     await db.Booking.findOrCreate({
//                         where: { patientId: user[0].id },
//                         defaults: {
//                             statusID: 'S1',
//                             doctorId: data.doctorId,
//                             patientId: user[0].id,
//                             date: data.date,
//                             timeType: data.timeType
//                         }


//                     })
//                 }
//                 resolve({
//                     errCode: 0,
//                     errMessage: 'Save infor patient success',
//                     data: user

//                 })
//             }

//         } catch (e) {
//             reject(e)
//         }
//     })
// }
let postBookAppoinmentService = async (data) => {
    try {

        if (!data.email || !data.doctorId || !data.timeType || !data.date) {
            return {
                errCode: 1,
                errMessage: 'Missing required parameter'
            };
        }


        let [user] = await db.User.findOrCreate({
            where: { email: data.email },
            defaults: {
                email: data.email,
                roleId: 'R3'
            }
        });


        let existedBooking = await db.Booking.findOne({
            where: {
                patientId: user.id,
                date: data.date
            }
        });

        if (existedBooking) {
            return {
                errCode: 2,
                errMessage: 'You already booked an appointment for this day'
            };
        }


        await db.Booking.create({
            statusID: 'S1',
            doctorId: data.doctorId,
            patientId: user.id,
            date: data.date,
            timeType: data.timeType
        });


        let emailResult = await emailService.sendSimpleEmail({
            email: data.email,
            fullName: data.fullName || 'Quý khách',
            doctorName: data.doctorName || 'Bác sĩ',
            time: data.timeType,
            date: data.date
        });

        if (!emailResult) {
            console.log('⚠️ Booking thành công nhưng gửi mail thất bại');
        }


        return {
            errCode: 0,
            errMessage: 'Booking created successfully'
        };

    } catch (e) {
        console.log('postBookAppoinmentService error:', e);
        throw e;
    }
};


export default {

    postBookAppoinmentService

}
