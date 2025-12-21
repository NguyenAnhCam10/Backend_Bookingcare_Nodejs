import express from "express";
import homeController from "../controllers/homeController.js"
import userController from "../controllers/userController.js"
import doctorController from "../controllers/doctorController.js"
import uploadCloud from "../middlewares/uploadCloud.js";
import patientController from "../controllers/patientController.js"
import specialtyController from '../controllers/specialtyController.js'
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  // router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post(
    "/api/create-new-user",
    uploadCloud.single('image'),
    userController.handleCreateNewUser
  );

  // router.put('/api/edit-user', userController.handleEditUser);
  router.put(
    "/api/edit-user",
    uploadCloud.single('image'),
    userController.handleEditUser
  );

  router.delete('/api/delete-user', userController.handleDeleteUser);
  router.get('/api/allcode', userController.getAllcode);

  router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
  router.get('/api/get-all-doctors', doctorController.getAllDoctors);
  router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
  router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
  router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)

  router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDocTorById)

  router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

  router.post('/api/create-doctor', uploadCloud.single('image'), doctorController.createDoctor);

  router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)

  router.post('/api/patient-book-appointment', patientController.postBookAppoinment)
  router.post('/api/verify-book-appointment', patientController.postverifyBookAppoinment)


  router.post('/api/create-new-specialty', uploadCloud.single('image'), specialtyController.createSpecialty);

  router.get('/api/get-specialty', specialtyController.getAllSpecialty);


  return app.use("/", router);
};

export default initWebRoutes;
