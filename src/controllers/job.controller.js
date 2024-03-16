import JobModel from "../models/job.model.js";
import { sendConfirmationMail } from "../middlewares/nodemailer.middleware.js";

export default class JobController {
    
    getAlljobs(req,res) {
        var jobs = JobModel.getAll();
        res.render('jobListing', { jobs,user:req.session.user });    
    }
    
    getJobDetails(req,res) {
        const data = JobModel.getJobDetails(req.params.id);
        res.render('Details',{data:data,user: req.session.user});
    }
    Postnewjob = (req, res) => {
        JobModel.AddNewJob(req.body);
        var jobs = JobModel.getAll();
        res.render('jobListing', { jobs,user:req.session.user });
    };
    getJobForm(req,res) {
        res.render('new-job',{user : req.session.user});
    }
    removeJob(req, res) {
        const id = req.params.id;
        JobModel.deleteJob(id);
        var jobs = JobModel.getAll();
        res.render('jobListing', { jobs, user:req.session.user });
    }
    getUpdateform = (req, res) => {
        const id = req.params.id;
        const jobDetails = JobModel.getJobDetails(id);
        res.render("update-job", { job: jobDetails });
    };
    updateJob(req, res) {
        const id = req.params.id;
        JobModel.updateJob(id,req.body);
        const data = JobModel.getJobDetails(req.params.id);
        res.render('Details',{data:data,user: req.session.user});
    }
    async newApplicant (req, res) {
        const id = req.params.id;
        const { name, email, contact } = req.body;
        const resumePath = req.file.filename;
        JobModel.addApplicant(id, name, email, contact, resumePath);
        await sendConfirmationMail(email);
        const data = JobModel.getJobDetails(req.params.id);
        res.render('Details',{data:data,user: req.session.user});
      };
      getallApplicants = (req, res) => {
        const id = req.params.id;
        const resp = JobModel.getAllApplicants(id);
        res.render("applicantsList", {
          allApplicants: resp,
          user: req.session.user,
        });
      };
}