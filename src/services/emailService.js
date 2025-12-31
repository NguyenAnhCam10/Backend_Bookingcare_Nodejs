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
            html: getBodyHTMLEmail(data)
        });

        console.log(' Email sent:', info.messageId);
        return true;
    } catch (e) {
        console.log(' Send email error:', e);
        return false;
    }
};


let getBodyHTMLEmail = (data) => {
    let result = ''
    if (data.language === 'vi') {
        result =
            `
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
           
        </p>

        <p>
            Vui lòng nhấn vào liên kết bên dưới để <strong>xác nhận lịch khám</strong>:
        </p>

        <p>
            👉 <a href="${data.redirecLink}">Xác nhận lịch khám</a>
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
    }
    if (data.language === 'en') {
        result = `
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#333;">
    <p>Hello <strong>${data.fullName}</strong>,</p>

    <p>
        You have successfully scheduled a medical appointment through
        <strong>Booking Appointment</strong>.
        Below are the appointment details:
    </p>

    <p>
        <strong>Doctor:</strong> ${data.doctorName}<br/>
        <strong>Time:</strong> ${data.time}<br/>
       
    </p>

    <p>
        Please click the link below to <strong>confirm your appointment</strong>:
    </p>

    <p>
        👉 <a href="${data.confirmLink}">Confirm Appointment</a>
    </p>

    <p style="margin-top:16px;">
        If you did not make this appointment, please ignore this email.
    </p>

    <p style="margin-top:24px;">
        Best regards,<br/>
        <strong>Booking Appointment</strong>
    </p>
</div>

        `

    }
    return result
}

let sendRemedyEmail = async (data) => {
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
            subject: 'Đơn thuốc / hóa đơn khám bệnh',
            html: getBodyHTMLRemedy(data)
        });

        console.log('✅ Remedy email sent:', info.messageId);
        return true;
    } catch (e) {
        console.log('❌ Send remedy email error:', e);
        return false;
    }
};

let getBodyHTMLRemedy = (data) => {
    return `
        <div style="font-family:Arial; font-size:14px">
            <p>Xin chào <strong>${data.fullName || 'bạn'}</strong>,</p>

            <p>
                Bác sĩ đã gửi cho bạn <strong>đơn thuốc / hóa đơn khám bệnh</strong>.
            </p>

            <p>
                👉 <a href="${data.fileUrl}" target="_blank">
                    Nhấn vào đây để tải file
                </a>
            </p>

            <p>
                Vui lòng lưu lại file để sử dụng khi cần.
            </p>

            <p style="margin-top:20px">
                Trân trọng,<br/>
                <strong>Booking Appointment</strong>
            </p>
        </div>
    `;
};

export default {
    sendSimpleEmail,

    sendRemedyEmail

}