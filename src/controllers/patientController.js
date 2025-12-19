import patientService from '../services/patientService.js'

let postBookAppoinment = async (req, res) => {


    try {

        let infor = await patientService.postBookAppoinmentService(req.body)
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
    postBookAppoinment

}

