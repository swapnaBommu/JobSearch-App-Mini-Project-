let idValue = 3;
export default class JobModel {
    constructor(
        id,
        category,
        designation,
        location,
        companyName,
        salary,
        applyBy,
        skillsReq,
        NoOfOpenings,
        jobPostedOn,
        applicants
        ){
            this.id = id;
            this.category = category;
            this.designation = designation;
            this.location = location;
            this.companyName = companyName;
            this.salary = salary;
            this.applyBy = applyBy;
            this.skillsReq = skillsReq;
            this.NoOfOpenings = NoOfOpenings;
            this.jobPostedOn = jobPostedOn;
            this.applicants = applicants;
        }
        static AddNewJob(job){
            const newJob = job;
            newJob.id = idValue + 1;
            newJob.applicants = [];
            jobs.push(newJob);
        }
        static getAll() {
            return jobs;
        }
        static getJobDetails(id){
            const result = jobs.find((j) => j.id == id );
            return result;
        }
        static deleteJob = (id) => {
            const index = jobs.findIndex((job) => {
              return job.id == id;
            });
            jobs.splice(index, 1);
        };
        static updateJob(id,updatedData){
            const index = jobs.findIndex((job) => {
                return job.id == id;
            });
            
            jobs[index].category = updatedData.category || jobs[index].category;
            jobs[index].designation = updatedData.designation || jobs[index].designation;
            jobs[index].location = updatedData.location || jobs[index].location;
            jobs[index].companyName = updatedData.companyName || jobs[index].companyName;
            jobs[index].salary = updatedData.salary || jobs[index].salary;
            jobs[index].applyBy = updatedData.applyBy || jobs[index].applyBy;
            jobs[index].skillsReq = updatedData.skillsReq || jobs[index].skillsReq;
            jobs[index].NoOfOpenings = updatedData.NoOfOpenings || jobs[index].NoOfOpenings;
        }
        static addApplicant = (id, ...applicantData) => {
            const index = jobs.findIndex((job) => {
              return job.id == id;
            });
            let applicantId = jobs[index].applicants.length + 1;
            jobs[index].applicants.push({
              applicant_id: applicantId,
              name: applicantData[0],
              email: applicantData[1],
              contact: applicantData[2],
              resumePath: applicantData[3],
            });
            return jobs[index].applicants;
          };
          
        static getAllApplicants = (id) => {
            const index = jobs.findIndex((job) => {
              return job.id == id;
            });
            return jobs[index].applicants;
          };
}
var jobs = [
    {
        id: 1,
        category: "Tech",
        designation: "SDE",
        location: "Gurgaon HR IND Remote",
        companyName: "Coding Ninjas",
        salary: "14-20lpa",
        applyBy: "30 Aug 2023",
        skillsReq: [
          "REACT",
          "NodeJs",
          "JS",
          "SQL",
          "MongoDB",
          "Express",
          "AWS",
        ],
       NoOfOpenings: 5,
        jobPostedOn: new Date().toLocaleString(),
        applicants: [
          {
            applicat_id: 1,
            name: "vivek",
            email: "krvivi28@gmail.com",
            contact: 7839358367,
            resumePath: "resume.pdf",
          },
        ],
    },
    {
        id: 2,
        category: "Tech",
        designation: "Angular Developer",
        location: "Pune IND On-Site",
        companyName: "Go Digit",
        salary: "6-10lpa",
        applyBy: "30 Aug 2023",
        skillsReq: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
       NoOfOpenings: 7,
        jobPostedOn: new Date().toLocaleString(),
        applicants: [],
    },
    {
        id: 3,
        category: "Tech",
        designation: "SDE",
        location: "Bangalore IND",
        companyName: "Juspay",
        salary: "20-26lpa",
        applyBy: "30 Aug 2023",
        skillsReq: [
          "REACT",
          "NodeJs",
          "JS",
          "SQL",
          "MongoDB",
          "Express",
          "AWS",
        ],
       NoOfOpenings: 3,
        jobPostedOn: new Date().toLocaleString(),
        applicants: [],
    },
];