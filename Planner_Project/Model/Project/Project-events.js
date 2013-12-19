/*
	@file Project-events
	@abstract define Project data class events
*/
/*
	@function onRemove
	@abstract define the action do when a project entity has been removed
*/
model.Project.events.onRemove = function() {
    var id = this.ID;

    //remove all relations stored between this project and assigned employees
    var projectEmployeeCollection = ds.Project_Employee.query("project.ID == :1", id);
    projectEmployeeCollection.remove();

    //remove all relations stored between this project and its needed skills
    var projectSkillCollection = ds.Project_Skill.query("project.ID == :1", id);
    projectSkillCollection.remove();
};

/*
	@function 	onRestrictingQuery
	@abstract 	return a customized result depending on the group
				the current user belongs to
*/
model.Project.events.onRestrictingQuery = function() {
    var res = null;
    if (currentSession().belongsTo('Director')) {
        res = this.all();
    } else if (currentSession().belongsTo('Manager')) {
        var userID = currentSession().user.ID;
        var pmID = IDUUD.UUDToId(userID);
        res = this.query('PM.ID = :1', pmID);
    } else if (currentSession().belongsTo('Employee')) {
        var userUUID = currentSession().user.ID;
        var empID = IDUUD.UUDToId(userUUID);
        res = this.query('employees.ID= :1', empID);
    }

    return res;
};