import specialtyService from '../services/specialtyService.js'



let createSpecialty = async (req, res) => {
    try {

        let infor = await specialtyService.createSpecialtyService({
            ...req.body,
            image: req.file?.path

        })

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
let getAllSpecialty = async (req, res) => {
    try {

        let infor = await specialtyService.getAllSpecialtyService()

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
    createSpecialty,
    getAllSpecialty

}

