import express from "express";
import homeController from "../controllers/homeController.js"
import userController from "../controllers/userController.js"
import doctorController from "../controllers/doctorController.js"
import uploadCloud from "../middlewares/uploadCloud.js";
console.log('uploadCloud:', uploadCloud);
console.log('createDoctor:', doctorController.createDoctor);

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
  router.post(
    '/api/create-doctor',
    uploadCloud.single('image'),
    doctorController.createDoctor
  );
  return app.use("/", router);
};

export default initWebRoutes;
