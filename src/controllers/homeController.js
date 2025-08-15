import db from '../models/index.js';
import CRUDService from '../services/CRUDService.js';
let getHomePage = async(req, res) => {
    try{
        let data = await db.User.findAll();
        console.log(data)
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }
}
let getCRUD = (req, res) =>{
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) =>{
    await CRUDService.createNewUser(req.body);
    return res.send('postCRUD')
}
export default {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  
};