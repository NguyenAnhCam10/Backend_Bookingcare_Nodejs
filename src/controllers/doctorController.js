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
            data: response
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

export default {
    getTopDoctorHome,
    createDoctor
};
