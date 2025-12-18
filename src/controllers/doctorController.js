import doctorService from '../services/doctorService.js';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit || 10;
    try {
        let response;
        if (limit === 'ALL') {
            response = await doctorService.getTopDoctorHome(null); // null = lấy tất cả
        } else {
            response = await doctorService.getTopDoctorHome(+limit); // chuyển sang number
        }

        // TRẢ DỮ LIỆU CHO FRONTEND
        return res.status(200).json({
            errCode: 0,
            data: response.data
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server'
        });
    }
};

let createDoctor = async (req, res) => {
    try {
        let data = req.body;

        // ✅ QUAN TRỌNG
        if (req.file) {
            data.image = req.file.path; // Cloudinary URL
        }

        let result = await doctorService.createDoctor(data);
        return res.status(200).json(result);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            message: 'Create doctor failed'
        });
    }
};
let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)
    } catch (e) {
        console.log("SERVER ERROR >>> ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errol from  the server'
        })
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);

        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errol from  the server'
        })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 3,
                errMessage: 'Missing req.query.id'
            })
        }
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errol from  the server'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {

        let infor = await doctorService.bulkCreateScheduleService(req.body)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errol from  the server'
        })
    }
}
let getScheduleByDate = async (req, res) => {
    try {

        let infor = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errol from  the server'
        })
    }
}
let getExtraInforDocTorById = async (req, res) => {
    try {

        let infor = await doctorService.getExtraInforDocTorByIdService(req.query.doctorId)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errol from  the server'
        })
    }
}
let getProfileDoctorById = async (req, res) => {
    try {

        let infor = await doctorService.getProfileDoctorByIdService(req.query.doctorId)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errol from  the server'
        })
    }
}
export default {
    getTopDoctorHome,
    createDoctor,
    getAllDoctors,
    postInforDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInforDocTorById,
    getProfileDoctorById,
};
