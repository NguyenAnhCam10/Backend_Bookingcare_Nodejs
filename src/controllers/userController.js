import userService from "../services/userService.js"

let handleLogin = async (req, res) => {
    console.log("BODY:", req.body);
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'miss'
        })
        
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}
export default {
    handleLogin,
}