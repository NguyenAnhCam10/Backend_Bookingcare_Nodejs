import { where } from "sequelize"
import db from "../models/index.js"
import { resolve } from "path"
import { rejects } from "assert"
import dotenv from 'dotenv'
dotenv.config()
import _ from 'lodash';
import { error } from "console"
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (data) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: `"Booking Appointment" <${process.env.EMAIL_APP}>`,
            to: data.email,
            subject: 'Thông tin đặt lịch khám bệnh',
            html: `
                <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#333;">
        <p>Xin chào <strong>${data.fullName}</strong>,</p>

        <p>
            Bạn đã đặt lịch khám bệnh thành công trên hệ thống
            <strong>Booking Appointment</strong>.
            Dưới đây là thông tin chi tiết:
        </p>

        <p>
            <strong>Bác sĩ:</strong> ${data.doctorName}<br/>
            <strong>Thời gian:</strong> ${data.time}<br/>
            <strong>Ngày khám:</strong> ${data.date}
        </p>

        <p>
            Vui lòng nhấn vào liên kết bên dưới để <strong>xác nhận lịch khám</strong>:
        </p>

        <p>
            👉 <a href="${data.confirmLink}">Xác nhận lịch khám</a>
        </p>

        <p style="margin-top:16px;">
            Nếu bạn không thực hiện đặt lịch này, vui lòng bỏ qua email.
        </p>

        <p style="margin-top:24px;">
            Trân trọng,<br/>
            <strong>Booking Appointment</strong>
        </p>
    </div>
            `
        });

        console.log(' Email sent:', info.messageId);
        return true;
    } catch (e) {
        console.log(' Send email error:', e);
        return false;
    }
};




export default {
    sendSimpleEmail



}