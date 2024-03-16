import JobModel from "../models/job.model.js";
import UserModel from "../models/user.model.js";
export default class UserController {
    getHomePage(req,res) {
        res.render('home')
    }
    getRegister(req, res) {
        res.render('register');
    }
    getLogin(req,res) {
        res.render('login');
    }
    confirmRegister (req, res) {
        const {name, email, password,role} = req.body;
        UserModel.add(name, email, password,role);
        res.render('login');
    }
    confirmLogin (req,res) {
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
          return res.render("404", {
            msg: "user not found please register",
          });
        }
        if(user.email === email && user.password === password){
            req.session.user = user;
            var jobs = JobModel.getAll();
            return res.render('jobListing', { jobs,user: req.session.user });
        }else{
            res.render("404", { msg: "invalid credentials" });
        }
       
    };
    logoutUser = (req, res) => {
        req.session.userEmail = null;
        res.clearCookie("lastVisit");
        req.session.destroy((err) => {
          if (err) console.log(err);
          else res.redirect("/login");
        });
    };

}