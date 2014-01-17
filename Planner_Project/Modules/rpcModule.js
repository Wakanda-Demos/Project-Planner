/*
	@file rpcModule.js
	@abstract export functions called from client-side.
*/
var utils = require('utils.js');

//@function getAllManagers
//@abstract get all managers
exports.getAllManagers = function() {
    var managers = ds.Employee.getSubSet("title = 'Project Manager'");
    return managers;
};

//@function getEmployees :
//@abstract get all employees satisfying the given criterias:
//			project
//			skills
//			minimum and maximum years of experience
//@params projectID: the project id
//		skills: array of skill IDs
//		min: minimum years of experience
//		max: maximum years of experience
exports.getEmployees = function(projectID, skills, min, max) {
    var project, infos, skillsID, rows, action;

    //retreive the project entity denoted by projectID
    project = ds.Project.find("ID = :1", projectID);

    //retreive the list of skills ID
    skillsID = project.skills.ID;

    //set the employee selection infos
    infos = {
        max: '16',
        //16 max year of experience
        min: '0',
        //0 min year of experience
        skillsID: ''
    };

    if (skills !== undefined && skills !== 0) {
        if (skills != 0) {
            skillsID = skills;
        }

        infos.max = max;
        infos.min = min;
    }

    infos.skillsID = skillsID.toString();

    //define the action to be performed on the shared worker
    action = {
        type: "getEmployees",
        data: infos
    };

    //perform the action now and retreive the rows
    utils.performAction(action, function(res) {
        rows = res;
    });

    return rows;
};

//@function getSelectedEmployees
//@abstract get the selected employees for a project
//@params projectID: the project id
exports.getSelectedEmployees = function(projectID) {
    var project, employeesID, skillsID, rows, action;

    project = ds.Project.find("ID = :1", projectID);

    employeesID = project.employees.ID;
    skillsID = project.skills.ID;

    if (employeesID.length == 0) {
        return null;
    }

    //define the action to be performed on the shared worker
    action = {
        type: 'filterEmployees',
        data: {
            employeesID: employeesID.toString()
        }
    };

    //perform the action now and retreive the rows
    utils.performAction(action, function(res) {
        rows = res;
    });

    return rows;
};

//
//@function	assignEmployeeToProject
//@abstract assign giving employees to a giving project
//@params 	employeeIDs : IDs array of employees to be assigned to a project.
//			projectID	: ID of the Project
exports.assignEmployeeToProject = function(employeeIDs, projectID) {
    var ecProjEmp, i, employeeID, pe, pmID, project;

    //remove employee collection related to the giving project (if exists)
    ecProjEmp = ds.Project_Employee.query("project.ID = :1", projectID);
    if (ecProjEmp) ecProjEmp.remove();

    //create employee collection and add it to project 
    project = ds.Project.find("ID = :1", projectID);

    //assign all the given employees to the project
    var len = employeeIDs.length;

    for (i = 0; i < len; ++i) {
        employeeID = employeeIDs[i];
        pe = ds.Project_Employee.createEntity();
        pe.project = project;
        pe.employee = ds.Employee.find("ID = :1", employeeID);
        pe.save();
    }

    // add Project Manager to employee collection
    pmID = ds.Project.find("ID = :1", projectID).PM.ID;
    pe = ds.Project_Employee.createEntity();
    pe.project = ds.Project.find("ID = :1", projectID);
    pe.employee = ds.Employee.find("ID = :1", pmID);
    pe.save();
};

//@function addModifProject
//@abstract add/edit a project
exports.addModifProject = function(project, skillsID) {
	//	
	if (!currentSession().belongsTo('Director')) {
		return;
	}
	
	var eProject, eEmployeePM, empls, pe, len;

    //if we want to create a new project
    if (project.newP) {
        if (ds.Project.query("Name == :1", project.Name).length != 0) {
            return;
        } else {
            eProject = ds.Project.createEntity();
        }
    } //if we want to edit an existing project
    else {
        eProject = ds.Project.find('ID = :1', project.ID);
        ds.Project_Skill.query("project.ID == :1", project.ID).remove();
    }

    //retreive the project manager
    eEmployeePM = ds.Employee.find("ID = :1", project.PMID);

    //fill project attributes
    eProject.Name = project.Name;
    eProject.Budget = Number(project.Budget);
    eProject.StartDate = project.StartDate;
    eProject.EndDate = project.EndDate;
    eProject.PM = eEmployeePM;
    eProject.save();

    empls = [project.PMID];

    var len = skillsID.length;

    for (var i = 0; i < len; ++i) {
        var skillID = skillsID[i];
        var query = "project.ID == :1 and skill.ID == :2";
        var projectSkillCollection = ds.Project_Skill.query(query, eProject.ID, skillID);

        //if this skill is not associated to this project
        if (projectSkillCollection.length == 0) {
            var ps = ds.Project_Skill.createEntity();
            ps.project = eProject;
            ps.skill = ds.Skill.find("ID = :1", skillID);
            ps.save();
        }
    }

    //create the Project_Employee entity
    pe = ds.Project_Employee.createEntity();
    pe.project = ds.Project.find("ID = :1", eProject.ID);
    pe.employee = ds.Employee.find("ID = :1", project.PMID);
    pe.save();
};
exports.getAvatar = function(id) {
    var avatar;
    //define the action to be performed on the shared worker
    action = {
        type: 'getAvatar',
        data: {
            ID: id
        }
    };

    //perform the action now and retreive the rows
    utils.performAction(action, function(res) {
        avatar = res;
    });

    return avatar;
};
exports.login = function(userName, password){
	//	http://doc.wakanda.org/loginByPassword.301-724283.en.html
	var result = loginByPassword(userName, password, 60*60); // session is created in case of success
	return result; // result is sent to the client
};