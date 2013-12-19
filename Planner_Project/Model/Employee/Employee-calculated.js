/*
	@file 		Employee-calculated.js
	
	@abstract	export Employee methods for retreiving
				calculated members of Employee dataclass
*/
// @function onGet
// @abstract returns the employee full name
model.Employee.name.onGet = function() {
    var a = this.get("firstname,lastname");
    return a.firstname + ' ' + a.lastname;
};

// @function onGet
// @abstract returns the employee salary per day
model.Employee.salary.onGet = function() {
    return this.salaryY / 250;
};

// @function onGet
// @abstract returns the employee UUID
model.Employee.UUID.onGet = function() {
    return IDUUD.idToUUID(this.ID);
};

// @function onGet
// @abstract returns the employee salary per year
model.Employee.salaryY.onGet = function() {
    var a = this.get("salary");
    return a.salary;
};

// @function onGet
// @abstract returns the employee avatar
model.Employee.avatar.onGet = function() {
    var action, res, avatar;

    //define the action to be performed on the shared worker
    action = {
        type: 'find',
        data: {
            table: "employee",
            columns: "avatar",
            filter: {
                id: this.ID
            }
        }
    };

    //perform the action now and retreive employee avatar
    utils.performAction(action, function(row) {
        avatar = row;
    });

    return avatar;
};