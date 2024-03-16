import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import UserController from './src/controllers/user.controller.js';
import JobController from './src/controllers/job.controller.js';
import session from 'express-session';
import {auth} from './src/middlewares/auth.middleware.js';
import uploadFile from "./src/middlewares/fileupload.middleware.js";
const server = express();

//use the static js file in public folder for delete 
server.use(express.static(path.resolve("src/public")));

//create an instance of controller classes
const usersController = new UserController();
const jobController = new JobController();

//setup ejs layouts
server.use(ejsLayouts);
server.use(express.json());

//parse form data
server.use(express.urlencoded({extended : true}));


//setup view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),"src","views"));
//creating session
server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    
}))
//routers
server.get('/', usersController.getHomePage);
server.get('/register',usersController.getRegister);
server.get('/login',usersController.getLogin);
server.post('/register',usersController.confirmRegister);
server.post('/login',usersController.confirmLogin);
server.get('/logout',usersController.logoutUser);
server.get('/jobs/postjob',jobController.getJobForm);
server.post('/jobs',auth,jobController.Postnewjob);
server.get('/jobs/:id',jobController.getJobDetails);
server.get("/job/delete/:id",auth, jobController.removeJob);
server.get("/jobs/update/:id",jobController.getUpdateform);
server.post("/jobs/update/:id", jobController.updateJob);
server.get("/jobs/applicants/:id",auth, jobController.getallApplicants);
server.post("/apply/:id", uploadFile.single("resume"),jobController.newApplicant);



server.use(express.static('src/views'));

server.listen(3200);
console.log('server is listening on 3200');